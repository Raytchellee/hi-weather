import React, { useEffect, useState } from "react";
import Card from "../WeatherCard";
import { useRecoilState } from "recoil";
import { forecastLoading, futureWeatherStore } from "@/stores";
import { ForecastList } from "@/interface/data.interface";
import styles from "./index.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface FutureDetailsProps {
  setModal: (modal: string) => void;
  setModalData: (data: any) => void;
}

const FutureDetails: React.FC<FutureDetailsProps> = ({
  setModal,
  setModalData,
}) => {
  const [forecast, setForecast] = useRecoilState(futureWeatherStore);
  const [load, setLoad] = useRecoilState(forecastLoading);
  const [dailyData, setDailyData] = useState({});
  const [summary, setSummary] = useState<ForecastList[]>([]);

  const loading = load.visible && load.type == "get-forecast-weather";

  const getForecastData = () => {
    const tempDaily: { [key: string]: any[] } = {};
    let tempSummary: ForecastList[] = [];
    forecast?.list?.forEach((item) => {
      const day = item?.dt_txt?.split(" ")[0];

      if (day) {
        if (!(day in tempDaily)) {
          tempDaily[day] = [];
          tempSummary?.push(item);
        }
        tempDaily[day].push(item);
      }
    });

    if (tempSummary?.length > 5) tempSummary = tempSummary?.slice(1, 6);

    setDailyData(tempDaily);
    setSummary(tempSummary);
  };

  useEffect(() => {
    getForecastData();
  }, [forecast]);

  return (
    <div className={styles.container}>
      {loading
        ? Array(5)
            .fill(1)
            .map((item: number, idx: number) => (
              <Skeleton key={idx} className={styles.card} />
            ))
        : summary.map((item: ForecastList, idx: number) => (
            <Card
              key={idx}
              data={item}
              dailyData={dailyData}
              setModal={setModal}
              setModalData={setModalData}
            />
          ))}
    </div>
  );
};

export default FutureDetails;
