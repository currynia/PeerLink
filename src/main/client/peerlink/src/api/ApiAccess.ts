export class ApiAccess {
  private static authenticated = false;
  static authenticateLogin(loginData: LoginData): any {
    return fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    }).then((response) => response.json());
  }

  static authenticateJwt(): any {
    return fetch("/auth", {
      method: "GET",
      headers: { Authorization: localStorage.getItem("token") as string },
    }).then((response) => response.json());
  }

  static authenticate(setAuth: (bool: boolean) => void): void {
    if (!ApiAccess.getAuthenticated()) {
      (async () => {
        const response = await ApiAccess.authenticateJwt();
        if (response.code == 201) {
          ApiAccess.setAuthenticated(true);
        }
        setAuth(ApiAccess.getAuthenticated());
      })();
    }
  }

  static retrieveTasks(username: string): any {
    return fetch("/api/tasks", {
      method: "GET",
      body: username,
    }).then((response) => response.json);
  }
  static setAuthenticated(bool: boolean) {
    this.authenticated = bool;
  }

  static getAuthenticated() {
    return this.authenticated;
  }
}

export interface LoginData {
  username: string;
  password: string;
}
