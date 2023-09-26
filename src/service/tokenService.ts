import { getCookie } from "cookies-next"

export class TokenService {
  /* static getTokenFromLocalStorage() {
    const token = localStorage.getItem("token")
    return token?.replaceAll('"', "")
  } */

  static getTokenFromLocalStorage() {
    const token = getCookie("token")
    return token
  }
}
