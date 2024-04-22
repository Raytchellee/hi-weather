import React from "react";
import styles from "./index.module.css";
import { ForecastList } from "@/interface/data.interface";
import { CloudyIcon } from "@/components/icons";
import { capitaliseWord } from "@/utils";

interface WeatherCardProps {
  data: ForecastList;
  dailyData: Record<string, any>;
  setModal: (modal: string) => void;
  setModalData: (data: any) => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  dailyData,
  setModal,
  setModalData,
}) => {
  const date = data?.dt ? new Date(data?.dt * 1000) : new Date("");
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  const day = date.toLocaleDateString("en-US", { day: "numeric" });
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.toLocaleDateString("en-US", { year: "numeric" });
  const temperature = data?.main?.temp && data?.main?.temp;
  const weatherDescription = data?.weather
    ? data?.weather[0]?.description
    : "A good day to look like a star";
  const iconUrl = data.weather
    ? `https://openweathermap.org/img/wn/${data.weather[0]?.icon}.png`
    : "";

  const handleClick = () => {
    const day = data?.dt_txt?.split(" ")[0];
    const details = day ? dailyData[day] : [];
    setModalData(details);
    setModal("daily-details");
  };

  return (
    <div className={styles.weatherCard} onClick={handleClick}>
      <h2 className={styles.date}>
        {weekday},{day} {month}
      </h2>
      <div className={styles.weatherDetails}>
        {iconUrl ? (
          <img src={iconUrl} alt="Weather icon" width="120px" height="120px" />
        ) : (
          <CloudyIcon height="100" width="100" />
        )}

        <span className={styles.temp}>
          {temperature + "°C" || "Temperature"}
        </span>
        <span className={styles.desc}>
          {capitaliseWord(weatherDescription) || "A normal day in the sky"}
        </span>
      </div>
    </div>
  );
};

export default WeatherCard;
