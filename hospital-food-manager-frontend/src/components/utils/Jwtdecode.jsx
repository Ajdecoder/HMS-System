import {jwtDecode} from "jwt-decode";

export function Decodejwt(jwtToDecode) {

  if (jwtToDecode) {
    const decodedToken = jwtDecode(jwtToDecode);    

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem("Hfmtoken");
    }
    return decodedToken;
  }
}
