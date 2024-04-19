import React, { CSSProperties, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { format } from "date-fns";
import RingLoader from "react-spinners/RingLoader";
import styles from "./index.module.css";
import { currentWeatherStore, LoadingAtom } from "@/stores";
import { currentFullNames } from "@/utils";
import { isNotEmpty } from "@/utils/is-not-empty";

interface RenderPropertiesProps {
  data: { [key: string]: string }[];
}

// const RenderProperties: React.FC<RenderPropertiesProps> = ({ data }) => {
const RenderProperties: React.FC = () => {
  const [current, setCurrent] = useRecoilState(currentWeatherStore);
  const [properties, setProperties] = useState<Record<string, any>>({});
  const [load, setLoad] = useRecoilState(LoadingAtom);

  const override: CSSProperties = {
    display: "inline",
    margin: "0 0.4rem",
  };

  const loading = load?.visible && load?.type == "get-current-weather";

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
    setProperties(convertToProperNames(current, {}));
  }, [current]);

  return (
    <div className={styles.render_properties}>
      {loading ? (
        <RingLoader
          color={"#fff"}
          loading={loading}
          cssOverride={override}
          size={70}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        Object.entries(properties)
          ?.filter(([key, _]) => currentFullNames[key]?.hasOwnProperty("type"))
          ?.map(([key, value], index) => (
            <span key={index} className={styles.item}>
              {(currentFullNames[key] as { label: string })?.label}
              {loading ? (
                <RingLoader
                  color={"#fff"}
                  loading={loading}
                  cssOverride={override}
                  size={12}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                isNotEmpty(value) &&
                `: ${getActualValue(value, key)}${
                  (currentFullNames[key] as { unit: string })?.unit
                }`
              )}
            </span>
          ))
      )}
    </div>
  );
};

export default RenderProperties;
