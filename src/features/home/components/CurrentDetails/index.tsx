import React, { CSSProperties } from "react";
import { useRecoilState } from "recoil";
import RingLoader from "react-spinners/RingLoader";
import { CloudyIcon, RainyIcon, SunnyIcon } from "@/components/icons";
import { currentWeatherStore, currentLoading } from "@/stores";
import styles from "./index.module.css";
import { capitaliseText, capitaliseWord } from "@/utils/capitalize-text";

const CurrentDetails: React.FC = () => {
  const [weatherData, setWeatherData] = useRecoilState(currentWeatherStore);
  const [load, setLoad] = useRecoilState(currentLoading);

  const loading = load?.visible && load?.type == "get-current-weather";

  const override: CSSProperties = {
    display: "inline",
    margin: "0.5rem 0",
  };

  const getWeatherDescription = () => {
    if (weatherData?.weather)
      return weatherData.weather[0]?.description?.toLowerCase();
  };

  const weatherDescription = getWeatherDescription();
  const iconComponent = weatherDescription?.includes("rain") ? (
    <RainyIcon />
  ) : weatherDescription?.includes("cloud") ||
    weatherDescription?.includes("snow") ? (
    <CloudyIcon />
  ) : (
    <SunnyIcon />
  );

  return (
    <div className={styles.container}>
      <span className={styles.title_box}>
        {loading ? (
          <RingLoader
            color={"#fff"}
            loading={loading}
            cssOverride={override}
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <h2 className={styles.title}>
            {`${weatherData?.name || "City"}${
              weatherData?.sys?.country ? "," + weatherData?.sys?.country : ""
            }`}
          </h2>
        )}
      </span>
      {iconComponent || <CloudyIcon />}
      <div>
        <span className={styles.temp}>
          {(weatherData?.main?.temp && weatherData?.main?.temp + "°C") ||
            "Temperature"}
        </span>
      </div>
      <div>
        <span className={styles.desc}>
          {(weatherData?.weather &&
            capitaliseWord(weatherData?.weather[0]?.description)) ||
            "A normal day in the sky"}
        </span>
      </div>
    </div>
  );
};

export default CurrentDetails;
