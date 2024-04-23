import React, { useState } from "react";
import styles from "./index.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { useActions } from "@/actions/fetch-data";
import { useRecoilState } from "recoil";
import { geocodeLoading } from "@/stores";
import toast from "react-hot-toast";

interface GeocodeQueryModalProps {
  onClose: () => void;
  open: boolean;
  setModal: (modal: string) => void;
}

const GeocodeQueryModal: React.FC<GeocodeQueryModalProps> = ({
  onClose,
  open,
  setModal,
}) => {
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [load, setLoad] = useRecoilState(geocodeLoading);
  const { fetchCurrentByGeoCode } = useActions();

  const loading = load.visible && load.type == "get-geocode-weather";

  const handleLongitudeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLongitude(event.target.value);
  };

  const handleLatitudeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(event.target.value);
  };

  const handleSubmit = async () => {
    if (longitude === "" || latitude === "") {
      toast.error("Please enter valid longitude and latitude values.");
      return;
    }
    const res = await fetchCurrentByGeoCode({ lon: longitude, lat: latitude });
    if (res) {
      setLongitude("");
      setLatitude("");
      setModal("result");
    }
  };

  return (
    <div
      className={styles.container}
      style={{ display: open ? "flex" : "none" }}
    >
      <div className={styles.wrap}>
        <div className={styles.header} onClick={onClose}>
          <h2 className={styles.title}>Enter Coordinates</h2>
          <span className={styles.close}>
            <IoCloseSharp size={30} />
          </span>
        </div>
        <div className={styles.input_wrap}>
          <div className={styles.input_box}>
            <label htmlFor="latitude">Latitude:</label>
            <input
              type="number"
              id="latitude"
              value={latitude}
              onChange={handleLatitudeChange}
              placeholder="6.5833"
              className={styles.input}
            />
          </div>
          <div className={styles.input_box}>
            <label htmlFor="longitude">Longitude:</label>
            <input
              type="number"
              id="longitude"
              value={longitude}
              onChange={handleLongitudeChange}
              placeholder="3.75"
              className={styles.input}
            />
          </div>
        </div>
        <div className={styles.btn_wrap}>
          <button className={styles.btn} onClick={handleSubmit}>
            {loading ? "Loading..." : "Submit"}
          </button>
          <button className={styles.btn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeocodeQueryModal;
