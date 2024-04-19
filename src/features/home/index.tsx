"use client";
import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useActions } from "@/actions/fetch-data";
import WeatherCard from "./components/WeatherCard";
import { useRecoilState } from "recoil";
import { currentWeatherStore, futureWeatherStore, LoadingAtom } from "@/stores";
import CurrentDetails from "./components/CurrentDetails";
import RenderProperties from "./components/RenderProperties";
import FutureDetails from "./components/FutureDetails";

export default function HomePage() {
  const { fetchCurrentData, fetchForecast, fetchCurrentByGeoCode } =
    useActions();
  const [city, setCity] = useState("");
  const [currentData, setCurrentData] = useRecoilState(currentWeatherStore);
  const [forecastData, setForecastData] = useRecoilState(futureWeatherStore);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetchCurrentData({ city });
    await fetchForecast({ city });
    await fetchCurrentByGeoCode({ lon: "3.75", lat: "6.5833" });
  };

  return (
    <div className={styles.weatherComponent}>
      <div className={styles.btn_box}>
        <button className={styles.btn}>Get weather data by geo codes</button>
      </div>
      <CurrentDetails />
      <RenderProperties />
      <FutureDetails />
    </div>
  );
}
