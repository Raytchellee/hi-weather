import React, { useEffect, useState } from "react";
import Card from "../WeatherCard";
import { useRecoilState } from "recoil";
import { futureWeatherStore } from "@/stores";
import { ForecastList } from "@/interface/data.interface";
import styles from "./index.module.css";

interface FutureDetailsProps {
  data: any[];
}

// const FutureDetails: React.FC<FutureDetailsProps> = ({ data }) => {
const FutureDetails: React.FC = () => {
  const [forecast, setForecast] = useRecoilState(futureWeatherStore);
  const [dailyData, setDailyData] = useState({});
  const [summary, setSummary] = useState<ForecastList[]>([]);

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

  useEffect(() => {
    console.log("dataringggg", dailyData, summary);
  }, [dailyData, summary]);

  return (
    <div className={styles.container}>
      {summary.map((item: ForecastList, idx: number) => (
        <Card key={idx} data={item} />
      ))}
    </div>
  );
};

export default FutureDetails;
