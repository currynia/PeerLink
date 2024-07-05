class UserDetails {
  static getUsername(): string {
    return JSON.parse(sessionStorage.getItem("user") as string)?.username;
  }

  static getToken(): string {
    return localStorage.getItem("token") as string;
  }
}

export default UserDetails;
