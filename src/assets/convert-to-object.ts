export function convertToProperName(obj: any, prefix: string = ""): any {
  const properObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const properKey = prefix + key.charAt(0).toUpperCase() + key.slice(1);
      if (typeof obj[key] === "object") {
        properObj[properKey] = convertToProperName(obj[key], properKey + " ");
      } else {
        properObj[properKey] = obj[key];
      }
    }
  }
  return properObj;
}