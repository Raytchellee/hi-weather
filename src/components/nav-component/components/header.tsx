"use client";
import React, {
  KeyboardEvent,
  KeyboardEventHandler,
  useEffect,
  useState,
} from "react";
import styles from "./index.module.css";
import Search from "@/components/search";
import { WeatherLogo } from "@/components/icons";
import { useActions } from "@/actions/fetch-data";
import { IoReload } from "react-icons/io5";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import toast from "react-hot-toast";
import { isNotEmpty } from "@/utils/is-not-empty";
import Link from "next/link";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const { fetchCurrentData, fetchForecast } = useActions();

  const handleSearch = async (
    s_city?: string,
    s_state?: string,
    s_country?: string
  ) => {
    if (
      (s_state || selectedRegion || s_country || selectedCountry) &&
      !isNotEmpty(s_city) &&
      !isNotEmpty(searchQuery)
    ) {
      toast.error(
        "You cannot search by country without entering a city name. Please enter a city name"
      );
      return;
    }
    await fetchCurrentData({
      city: s_city !== undefined ? s_city : searchQuery,
      state: s_state !== undefined ? s_state : selectedRegion,
      country: s_country !== undefined ? s_country : selectedCountry,
    });
    await fetchForecast({
      city: s_city !== undefined ? s_city : searchQuery,
      state: s_state !== undefined ? s_state : selectedRegion,
      country: s_country !== undefined ? s_country : selectedCountry,
    });
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className={styles.header_wrapper}>
      <Link
        href="https://github.com/afuawonders/Hi-Weather.git"
        className={styles.logo_container}
      >
        <WeatherLogo />
        <span className={styles.logo_text}>Weather Forecast</span>
      </Link>
      <div className={styles.input_wrapper}>
        <div className={styles.action}>
          <span
            className={styles.span}
            onClick={() => {
              setSelectedRegion("");
              setSelectedCountry("");
              setSearchQuery("");
              handleSearch("", "", "");
            }}
          >
            <IoReload color="#fff" size={24} />
          </span>

          <Search
            updateSearchQuery={(val) => {
              setSearchQuery(val);
            }}
            handleSearchFunc={handleSearch}
            searchQuery={searchQuery}
            handleKeyDown={handleKeyDown}
          />
        </div>
        <div className={styles.selector}>
          <div className={styles.input_container}>
            <CountryDropdown
              id="country"
              value={selectedCountry}
              valueType="short"
              onChange={(val) => {
                setSelectedCountry(val);
              }}
            />
          </div>
          {/* <div className={styles.input_container}>
            <RegionDropdown
              countryValueType="short"
              valueType="short"
              country={selectedCountry}
              value={selectedRegion}
              onChange={(value) => {
                setSelectedRegion(value);
              }}
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};
