const isLocal = process.env.NODE_ENV === "development";

interface Constants {
  isLocal: boolean;
}

export const constants: Constants = {
  isLocal: isLocal,
};
