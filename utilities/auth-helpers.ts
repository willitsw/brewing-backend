import jwt_decode from "jwt-decode";

export const getUidFromToken = (token: string) => {
  if (token.includes("DEVUSER")) {
    return "DEVUSER";
  }
  const decodedToken: any = jwt_decode(token);
  return decodedToken.user_id;
};
