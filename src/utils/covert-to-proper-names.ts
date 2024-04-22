import { format } from "date-fns";
import { currentFullNames } from "./constants";

export const convertToProperNames = (obj: any, properObj: any) => {
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

export const getActualValue = (value: string | number, key: string) => {
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