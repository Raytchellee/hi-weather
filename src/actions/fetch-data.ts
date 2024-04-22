import { useRecoilState, useRecoilValue } from "recoil";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import {
  currentWeatherStore,
  futureWeatherStore,
  currentGeocodeStore,
  currentLoading,
  forecastLoading,
  geocodeLoading,
} from "@/stores";
import { QueryProps } from "@/interface/data.interface";

export const useActions = () => {
  const [_current, setCurrent] = useRecoilState(currentWeatherStore);
  const [_Future, setFuture] = useRecoilState(futureWeatherStore);
  const [_currentGeo, setCurrentGeo] = useRecoilState(currentGeocodeStore);
  const [currentLoad, setCurrentLoading] = useRecoilState(currentLoading);
  const [forecastLoad, setForecastLoading] = useRecoilState(forecastLoading);
  const [geocodeLoad, setGeocodeLoading] = useRecoilState(geocodeLoading);
  const baseUrl = "https://api.openweathermap.org";
  const defaultUnit = "metric";
  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const defaultCity = "lagos";
  const defaultCount = 40;

  // const fetchCurrentData = useCallback(
  //   async ({ city, unit, state, country }: QueryProps) => {
  //     const url = `${baseUrl}/data/2.5/weather?q=${city || defaultCity}${state ? "," + state : ""
  //       }${country ? "," + country : ""}&appid=${apiKey}&units=${unit || defaultUnit
  //       }`;
  //     setCurrentLoading({
  //       type: "get-current-weather",
  //       visible: true,
  //     });

  //     return await new Promise((resolve, reject) => {
  //       fetch(`${url}`)
  //         .then((response) => response.json())
  //         .then((response) => {
  //           if (Number(response.cod) === 200) {
  //             setCurrent(response);
  //             resolve(true);
  //           } else {
  //             toast.error(
  //               "An error occurred while fetching current data. Please ensure you entered the correct details"
  //             );
  //             setCurrentLoading({
  //               type: "get-current-weather",
  //               visible: false,
  //             });
  //             resolve(false);
  //           }
  //         })
  //         .catch((err) => {
  //           setCurrentLoading({
  //             type: "get-current-weather",
  //             visible: false,
  //           });
  //           toast.error(err.message);
  //           resolve(false);
  //         });
  //     });
  //   },
  //   []
  // );

  const fetchCurrentData = useCallback(
    async ({ city, unit, state, country }: QueryProps) => {
      const url = `${baseUrl}/data/2.5/weather?q=${city || defaultCity}${state ? "," + state : ""
        }${country ? "," + country : ""}&appid=${apiKey}&units=${unit || defaultUnit
        }`;
      setCurrentLoading({
        type: "get-current-weather",
        visible: true,
      });

      try {
        const response = await fetch(`${url}`);
        const data = await response.json();

        if (Number(data.cod) === 200) {
          setCurrent(data);
          return true;
        } else if (data?.message) {
          toast.error(data?.message);
          return false;
        } else {
          toast.error(
            "An error occurred while fetching current data. Please ensure you entered the correct details"
          );
          return false;
        }
      } catch (err: any) {
        toast.error(err.message);
        return false;
      } finally {
        setCurrentLoading({
          type: "get-current-weather",
          visible: false,
        });
      }
    },
    []
  );

  // const fetchForecast = useCallback(
  //   async ({ city, count, unit, state, country }: QueryProps) => {
  //     const url = `${baseUrl}/data/2.5/forecast?q=${city || defaultCity}${state ? "," + state : ""
  //       }${country ? "," + country : ""}&appid=${apiKey}&cnt=${count || defaultCount
  //       }&units=${unit || defaultUnit}`;
  //     setForecastLoading({
  //       type: "get-forecast-weather",
  //       visible: true,
  //     });

  //     return await new Promise((resolve, reject) => {
  //       fetch(`${url}`)
  //         .then((response) => response.json())
  //         .then((response) => {
  //           if (Number(response.cod) == 200) {
  //             setFuture(response);
  //             resolve(true);
  //           } else {
  //             toast.error(
  //               "An error occurred while fetching forecast data. Please ensure you entered the correct details"
  //             );
  //             setForecastLoading({
  //               type: "get-forecast-weather",
  //               visible: false,
  //             });
  //             resolve(false);
  //           }
  //         })
  //         .catch((err) => {
  //           setForecastLoading({
  //             type: "get-forecast-weather",
  //             visible: false,
  //           });
  //           toast.error(err.message);
  //           resolve(false);
  //         });
  //     });
  //   },
  //   []
  // );

  const fetchForecast = useCallback(
    async ({ city, count, unit, state, country }: QueryProps) => {
      const url = `${baseUrl}/data/2.5/forecast?q=${city || defaultCity}${state ? "," + state : ""
        }${country ? "," + country : ""}&appid=${apiKey}&cnt=${count || defaultCount
        }&units=${unit || defaultUnit}`;
      setForecastLoading({
        type: "get-forecast-weather",
        visible: true,
      });

      try {
        const response = await fetch(`${url}`);
        const data = await response.json();

        if (Number(data.cod) === 200) {
          setFuture(data);
          return true;
        } else if (data?.message) {
          toast.error(data?.message);
          return false;
        } else {
          toast.error(
            "An error occurred while fetching forecast data. Please ensure you entered the correct details"
          );
          return false;
        }
      } catch (err: any) {
        toast.error(err.message);
        return false;
      } finally {
        setForecastLoading({
          type: "get-forecast-weather",
          visible: false,
        });
      }
    },
    []
  );

  // const fetchCurrentByGeoCode = useCallback(
  //   async ({ lat, lon, unit }: QueryProps) => {
  //     const url = `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit || defaultUnit}`;
  //     setGeocodeLoading({
  //       type: "get-geocode-weather",
  //       visible: true,
  //     });

  //     return await new Promise((resolve, reject) => {
  //       fetch(`${url}`)
  //         .then((response) => response.json())
  //         .then((response) => {
  //           if (Number(response.cod) == 200) {
  //             setCurrentGeo(response);
  //             resolve(true);
  //           } else {
  //             toast.error(
  //               "An error occurred while fetching geocode data. Please ensure you entered the correct details"
  //             );
  //             setGeocodeLoading({
  //               type: "get-geocode-weather",
  //               visible: false,
  //             });
  //             resolve(false);
  //           }
  //         })
  //         .catch((err) => {
  //           setGeocodeLoading({
  //             type: "get-geocode-weather",
  //             visible: false,
  //           });
  //           toast.error(err.message);
  //           resolve(false);
  //         });
  //     });
  //   },
  //   []
  // );

  const fetchCurrentByGeoCode = useCallback(
    async ({ lat, lon, unit }: QueryProps) => {
      const url = `${baseUrl}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit || defaultUnit
        }`;
      setGeocodeLoading({
        type: "get-geocode-weather",
        visible: true,
      });

      try {
        const response = await fetch(`${url}`);
        const data = await response.json();

        if (Number(data.cod) === 200) {
          setCurrentGeo(data);
          return true;
        } else if (data?.message) {
          toast.error(data?.message);
          return false;
        } else {
          toast.error(
            "An error occurred while fetching geocode data. Please ensure you entered the correct details"
          );
          return false;
        }
      } catch (err: any) {
        toast.error(err.message);
        return false;
      } finally {
        setGeocodeLoading({
          type: "get-geocode-weather",
          visible: false,
        });
      }
    },
    []
  );

  return { fetchCurrentData, fetchForecast, fetchCurrentByGeoCode };
};
