import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { ForecastList } from "@/interface/data.interface";
import { convertToProperNames, currentFullNames } from "@/utils";
import { isNotEmpty } from "@/utils/is-not-empty";

interface Props {
  data: ForecastList[];
  onClose: () => void;
  open: boolean;
}

const FutureDetailsModal: React.FC<Props> = ({ data, open, onClose }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );
  const [modifiedData, setModifiedData] = useState<{ [key: string]: any[] }[]>(
    []
  );
  const [rows, setRows] = useState<{ [key: string]: any[] }>({});

  useEffect(() => {
    if (data) {
      setModifiedData(data?.map((item) => convertToProperNames(item, {})));
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const temp: { [key: string]: any[] } = {};
    if (modifiedData) {
      modifiedData.forEach((item) => {
        for (const key in item) {
          if (temp[key]) {
            temp[key].push(item[key]);
          } else {
            temp[key] = [item[key]];
          }
        }
      });
      for (const key in temp) {
        if (temp[key].length < 8) {
          const missing = 8 - temp[key].length;
          for (let i = 0; i < missing; i++) {
            temp[key].push("");
          }
        }
      }
    }
    setRows(temp);
  }, [modifiedData]);

  const renderTable = () => {
    return (
      <div className={styles.wrap}>
        <div className={styles.header} onClick={onClose}>
          <span className={styles.close}>
            <IoCloseSharp size={30} />
          </span>
        </div>
        {isSmallScreen ? (
          <div className={styles.table_box}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thead}></th>
                  <th className={styles.thead}>12AM</th>
                  <th className={styles.thead}>3AM</th>
                  <th className={styles.thead}>6AM</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(rows).map(([elem, val], idz) => (
                  <tr key={idz}>
                    <td className={styles.row_title}>
                      {(currentFullNames[elem] as { label: string })?.label}
                    </td>
                    {val
                      ?.filter((item, idx) => idx < 3)
                      ?.map((item, idy) => (
                        <td className={styles.tdata} key={idy}>
                          {isNotEmpty(item)
                            ? item +
                              (currentFullNames[elem] as { unit: string })?.unit
                            : "- -"}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thead}></th>
                  <th className={styles.thead}>9AM</th>
                  <th className={styles.thead}>12PM</th>
                  <th className={styles.thead}>3PM</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(rows).map(([elem, val], idz) => (
                  <tr key={idz}>
                    <td className={styles.row_title}>
                      {(currentFullNames[elem] as { label: string })?.label}
                    </td>
                    {val
                      ?.filter((item, idx) => idx > 2 && idx < 6)
                      ?.map((item, idy) => (
                        <td className={styles.tdata} key={idy}>
                          {isNotEmpty(item)
                            ? item +
                              (currentFullNames[elem] as { unit: string })?.unit
                            : "- -"}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.thead}></th>
                  <th className={styles.thead}>6PM</th>
                  <th className={styles.thead}>9PM</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(rows).map(([elem, val], idz) => (
                  <tr key={idz}>
                    <td className={styles.row_title}>
                      {(currentFullNames[elem] as { label: string })?.label}
                    </td>
                    {val
                      ?.filter((item, idx) => idx > 5 && idx < 8)
                      ?.map((item, idy) => (
                        <td className={styles.tdata} key={idy}>
                          {isNotEmpty(item)
                            ? item +
                              (currentFullNames[elem] as { unit: string })?.unit
                            : "- -"}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.thead}></th>
                <th className={styles.thead}>12AM</th>
                <th className={styles.thead}>3AM</th>
                <th className={styles.thead}>6AM</th>
                <th className={styles.thead}>9AM</th>
                <th className={styles.thead}>12PM</th>
                <th className={styles.thead}>3PM</th>
                <th className={styles.thead}>6PM</th>
                <th className={styles.thead}>9PM</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(rows).map(([elem, val], idz) => (
                <tr key={idz}>
                  <td className={styles.row_title}>
                    {(currentFullNames[elem] as { label: string })?.label}
                  </td>
                  {val?.map((item, idy) => (
                    <td className={styles.tdata} key={idy}>
                      {isNotEmpty(item)
                        ? item +
                          (currentFullNames[elem] as { unit: string })?.unit
                        : "- -"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  };

  return (
    <div
      className={styles.container}
      style={{ display: open ? "flex" : "none" }}
    >
      {renderTable()}
    </div>
  );
};

export default FutureDetailsModal;
