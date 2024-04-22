import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { currentGeocodeStore, geocodeLoading } from "@/stores";
import { capitaliseWord, currentFullNames } from "@/utils";
import { CloudyIcon } from "@/components/icons";
import { format } from "date-fns";
import { isNotEmpty } from "@/utils/is-not-empty";

interface GeocodeQueryModalProps {
  onClose: () => void;
  open: boolean;
}

const GeocodeResultModal: React.FC<GeocodeQueryModalProps> = ({
  onClose,
  open,
}) => {
  const [weatherData, setWeatherData] = useRecoilState(currentGeocodeStore);
  const [load, setLoad] = useRecoilState(geocodeLoading);
  const [properties, setProperties] = useState<Record<string, any>>({});

  const loading = load?.visible && load?.type == "get-current-weather";

  const iconUrl = weatherData.weather
    ? `https://openweathermap.org/img/wn/${weatherData.weather[0]?.icon}.png`
    : "";

  const getWeatherDescription = () => {
    if (weatherData?.weather)
      return weatherData.weather[0]?.description?.toLowerCase();
  };

  const convertToProperNames = (obj: any, properObj: any) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && key !== "weather") {
        if (typeof obj[key] === "object") {
          convertToProperNames(obj[key], properObj);
        } else {
          properObj[key] = obj[key];
        }
      }
    }
    return properObj;
  };

  const getActualValue = (value: string | number, key: string) => {
    const valueType = (currentFullNames[key] as { type: string })?.type;
    if (valueType == "time") {
      return format(new Date(Number(value) * 1000), "HH:mm:ss");
    } else if (valueType == "timezone") {
      const time = Math.floor(Number(value) / 3600);
      return (time < 0 ? "GMT" : "GMT+") + String(time);
    } else {
      return value;
    }
  };

  useEffect(() => {
    setProperties(convertToProperNames(weatherData, {}));
  }, [weatherData]);

  const weatherDescription = getWeatherDescription();
  return (
    <div
      className={styles.container}
      style={{ display: open ? "flex" : "none" }}
    >
      <div className={styles.wrap}>
        <div className={styles.header} onClick={onClose}>
          <span className={styles.close}>
            <IoCloseSharp size={30} />
          </span>
        </div>
        <span className={styles.title_box}>
          <h2 className={styles.title}>
            {`${weatherData?.name || "City"}${
              weatherData?.sys?.country ? "," + weatherData?.sys?.country : ""
            }`}
          </h2>
        </span>
        {iconUrl ? (
          <img src={iconUrl} alt="Weather icon" width="120px" height="120px" />
        ) : (
          <CloudyIcon height="100" width="100" />
        )}
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
        <div className={styles.render_properties}>
          {Object.entries(properties)
            ?.filter(([key, _]) =>
              currentFullNames[key]?.hasOwnProperty("type")
            )
            ?.map(([key, value], index) => (
              <span key={index} className={styles.item}>
                {(currentFullNames[key] as { label: string })?.label}
                {isNotEmpty(value) &&
                  `: ${getActualValue(value, key)}${
                    (currentFullNames[key] as { unit: string })?.unit
                  }`}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default GeocodeResultModal;
