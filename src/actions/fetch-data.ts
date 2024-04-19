import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useState } from "react";
// import { CATEGORIES } from "../enums";
// import { Phone } from "../interfaces/phone.interface";
import { toast } from "react-hot-toast";
// import {
//   StorageAtom,
//   SearchTermAtom,
//   MinPriceAtom,
//   MaxPriceAtom,
//   CategoriesAtom,
//   PhonesAtom,
//   LoadingAtom,
// } from "../states";
import { currentWeatherStore, LoadingAtom, futureWeatherStore, currentGeocodeStore } from "@/stores";
import { QueryProps } from "@/interface/data.interface";

export const useActions = () => {
  const [_current, setCurrent] = useRecoilState(currentWeatherStore);
  const [_Future, setFuture] = useRecoilState(futureWeatherStore);
  const [_currentGeo, setCurrentGeo] = useRecoilState(currentGeocodeStore);
  const [loading, setLoading] = useRecoilState(LoadingAtom);
  const baseUrl = "https://api.openweathermap.org";
  const defaultUnit = "metric";
  const apiKey = "e8746e3d4f4ecb735e93354b84075ffe";
  const defaultCity = "lagos";
  const defaultCount = 40;

  const fetchCurrentData = useCallback(
    async ({ city, unit, state, country }: QueryProps) => {
      const url = `${baseUrl}/data/2.5/weather?q=${city || defaultCity}${state ? "," + state : ""
        }${country ? "," + country : ""}&appid=${apiKey}&units=${unit || defaultUnit
        }`;
      setLoading({
        type: "get-current-weather",
        visible: true,
      });

      return await new Promise((resolve, reject) => {
        fetch(`${url}`)
          .then((response) => response.json())
          .then((response) => {
            if (Number(response.cod) === 200) {
              setCurrent(response);
              resolve(true);
            } else {
              toast.error(
                "An error occurred while fetching current data. Please ensure you entered the correct details"
              );
              setLoading({
                type: "get-current-weather",
                visible: false,
              });
              resolve(false);
            }
          })
          .catch((err) => {
            setLoading({
              type: "get-current-weather",
              visible: false,
            });
            toast.error(err.message);
            resolve(false);
          });
      });
    },
    []
  );

  const fetchForecast = useCallback(
    async ({ city, count, unit, state, country }: QueryProps) => {
      const url = `${baseUrl}/data/2.5/forecast?q=${city || defaultCity}${state ? "," + state : ""
        }${country ? "," + country : ""}&appid=${apiKey}&cnt=${count || defaultCount
        }&units=${unit || defaultUnit}`;
      setLoading({
        type: "get-forecast-weather",
        visible: true,
      });

      return await new Promise((resolve, reject) => {
        fetch(`${url}`)
          .then((response) => response.json())
          .then((response) => {
            if (Number(response.cod) == 200) {
              setFuture(response);
              resolve(true);
            } else {
              toast.error(
                "An error occurred while fetching forecast data. Please ensure you entered the correct details"
              );
              setLoading({
                type: "get-forecast-weather",
                visible: false,
              });
              resolve(false);
            }
          })
          .catch((err) => {
            setLoading({
              type: "get-forecast-weather",
              visible: false,
            });
            toast.error(err.message);
            resolve(false);
          });
      });
    },
    []
  );

  const fetchCurrentByGeoCode = useCallback(
    async ({ lat, lon, unit }: QueryProps) => {
      const url = `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit || defaultUnit}`;
      setLoading({
        type: "get-geocode-weather",
        visible: true,
      });

      return await new Promise((resolve, reject) => {
        fetch(`${url}`)
          .then((response) => response.json())
          .then((response) => {
            if (Number(response.cod) == 200) {
              setCurrentGeo(response);
              resolve(true);
            } else {
              toast.error(
                "An error occurred while fetching geocode data. Please ensure you entered the correct details"
              );
              setLoading({
                type: "get-forecast-weather",
                visible: false,
              });
              resolve(false);
            }
          })
          .catch((err) => {
            setLoading({
              type: "get-geocode-weather",
              visible: false,
            });
            toast.error(err.message);
            resolve(false);
          });
      });
    },
    []
  );

  return { fetchCurrentData, fetchForecast, fetchCurrentByGeoCode };
};
