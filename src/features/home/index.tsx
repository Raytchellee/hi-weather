"use client";
import React, { EventHandler, useEffect, useState } from "react";
import styles from "./index.module.css";
import { useActions } from "@/actions/fetch-data";
import { useRecoilState } from "recoil";
import { currentWeatherStore, futureWeatherStore } from "@/stores";
import CurrentDetails from "./components/CurrentDetails";
import RenderProperties from "./components/RenderProperties";
import FutureDetails from "./components/FutureDetails";
import GeocodeQueryModal from "./components/modals/GeocodeQueryModal";
import GeocodeResultModal from "./components/modals/GeocodeResultModal";
import FutureDetailsModal from "./components/modals/FutureDetailsModal";

export default function HomePage() {
  const { fetchCurrentData, fetchForecast, fetchCurrentByGeoCode } =
    useActions();
  const [city, setCity] = useState("");
  const [modal, setModal] = useState("");
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetchCurrentData({ city });
    await fetchForecast({ city });
    await fetchCurrentByGeoCode({ lon: "3.75", lat: "6.5833" });
  };

  const handleOpen = () => {
    setModal("query");
  };

  return (
    <div className={styles.weatherComponent}>
      <div className={styles.btn_box}>
        <button onClick={handleOpen} className={styles.btn}>
          Get weather data by geo codes
        </button>
      </div>
      <CurrentDetails />
      <RenderProperties />
      <FutureDetails setModal={setModal} setModalData={setModalData} />

      <GeocodeQueryModal
        open={modal == "query"}
        onClose={() => setModal("")}
        setModal={setModal}
      />
      <GeocodeResultModal
        open={modal == "result"}
        onClose={() => setModal("")}
      />

      <FutureDetailsModal
        open={modal == "daily-details"}
        onClose={() => setModal("")}
        data={modalData}
      />
    </div>
  );
}
