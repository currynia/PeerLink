import { ChatDto, Message } from "../component/feature/chat/ChatDto";

export class ApiAccess {
  private static authenticated = false;
  static authenticateLogin(userDto: LoginDto): any {
    return fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDto),
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
          sessionStorage.setItem("user", JSON.stringify(response.user));
        }
        setAuth(ApiAccess.getAuthenticated());
      })();
    }
  }

  static retrieveTasks(username: string): Promise<Array<string>> {
    return fetch("/api/getTasks", {
      method: "POST",
      body: username,
    }).then((response) => response.json());
  }

  static saveTasks(tasksDto: TasksDto): void {
    fetch("/api/addTasks", {
      method: "POST",
      body: JSON.stringify(tasksDto),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  static retrieveChatHistory(
    id: string,
    token: string
  ): Promise<Array<{ id: string; results: Array<Message> }>> {
    return fetch("/api/chat/history", {
      method: "POST",
      body: JSON.stringify({ username: id, jwtToken: token }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  static setAuthenticated(bool: boolean) {
    this.authenticated = bool;
  }

  static getAuthenticated() {
    return this.authenticated;
  }
}

export interface TasksDto {
  username: string;
  tasks: string[];
}
export interface LoginDto {
  username: string;
  password: string;
}
