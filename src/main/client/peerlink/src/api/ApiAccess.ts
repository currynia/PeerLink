import { Message } from "../component/feature/chat/ChatDto";

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

  static filterProfile(filter: Filter): Promise<Array<UserProfile>> {
      return fetch("/api/filterProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(filter),
      }).then((response) => response.json())
  }

  static getProfile(username: userReq): Promise<UserProfile>{
      return fetch("/api/getProfile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(username),
      }).then((response) => response.json())
  }

  static updateProfile(UserProfile: UserProfile): void {
    fetch("/api/updateProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserProfile),
    })
  }

  static retrieveSessions(): Promise<Array<StudySession>> {
    return fetch("/api/studySession/allSession", {
      method: "GET"    
    }).then((response)=> response.json())
  }
  static deleteStudySession(session: StudySession): void{
    fetch("/api/studySession/deleteSession", {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(session),
    }).then((response)=> response.json)
  }

  static retrieveUserSessions(username: userReq): Promise<Array<StudySession>> {
    return fetch("/api/studySession/mySessions", {
      method: "POST",
      body: JSON.stringify(username),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
  }

  static addSessions(session: SessionWOId): Promise<StudySession> {
    return fetch("/api/studySession/addSession", {
      method: "POST",
      body: JSON.stringify(session),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response)=> response.json())
  }

  static updateSession(updatedSession:StudySession): Promise<StudySession>{
    return fetch("/api/studySession/updateSession",{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSession),
    }).then((response) => response.json());
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
export interface Filter{
  gender: string;
  modules: string;
  major: string;
}

export interface UserProfile{
  username:string;
  email:string;
  age:string;
  gender:string;
  major:string;
  modules: string[];
}

export interface StudySession{
  id: string;
  date: string;
  location: string;
  user: string;
}

export interface SessionWOId{
  date:string;
  location:string;
  user:string;
}
export interface userReq{
  username:string;
}
export interface TasksDto {
  username: string;
  tasks: string[];
}
export interface LoginDto {
  username: string;
  password: string;
}
