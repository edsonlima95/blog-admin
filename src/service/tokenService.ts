export class TokenService {
  static getTokenFromLocalStorage() {
    const token = localStorage.getItem("token")
    return token?.replaceAll('"', "")
  }
}
