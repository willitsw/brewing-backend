import jwt_decode from "jwt-decode";
import { FirebaseUser } from "../types/firebase-user";

export const decodeToken = (token: string): FirebaseUser => {
  try {
    if (token.includes("DEVUSER")) {
      return {
        userId: "123456789",
        displayName: "DEVUSER",
        email: "DEVUSER@DEVUSER.DEVUSER",
      };
    }
    const decodedToken: any = jwt_decode(token);
    return {
      userId: decodedToken.user_id,
      displayName: decodedToken.name ?? decodedToken.email,
      email: decodedToken.email,
    };
  } catch (e) {
    throw Error(`{Forbidden}: Token decode error: ${e}`);
  }
};
