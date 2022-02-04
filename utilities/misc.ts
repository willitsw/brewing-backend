export const isEmptyOrNullObject = (obj: any): boolean => {
  return !obj || Object.keys(obj).length === 0;
};
