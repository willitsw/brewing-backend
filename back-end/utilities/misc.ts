export const isEmptyOrNullObject = (obj: Object): boolean => {
  return !obj || Object.keys(obj).length === 0;
};
