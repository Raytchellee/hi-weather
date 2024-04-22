import { CurrentWeatherData, FutureWeatherData } from "@/interface/data.interface";
import { atom } from "recoil";

export const forecastLoading = atom({
  key: "forecastLoading",
  default: {
    type: "",
    visible: false,
  },
});

export const currentLoading = atom({
  key: "currentLoading",
  default: {
    type: "",
    visible: false,
  },
});

export const geocodeLoading = atom({
  key: "geocodeLoading",
  default: {
    type: "",
    visible: false,
  },
});

export const currentWeatherStore = atom<CurrentWeatherData>({
  key: "currentWeatherStore",
  default: {},
});

export const currentGeocodeStore = atom<CurrentWeatherData>({
  key: "currentGeocodeStore",
  default: {},
});

export const futureWeatherStore = atom<FutureWeatherData>({
  key: "futureWeatherStore",
  default: {},
});
