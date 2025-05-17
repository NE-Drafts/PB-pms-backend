export const convertBigIntToString = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertBigIntToString);
  } else if (obj instanceof Date) {
    return obj.toISOString();
  } else if (obj !== null && typeof obj === "object") {
    const newObj: any = {};
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === "bigint") {
        newObj[key] = value.toString();
      } else {
        newObj[key] = convertBigIntToString(value);
      }
    }
    return newObj;
  }
  return obj;
  return obj;
};
