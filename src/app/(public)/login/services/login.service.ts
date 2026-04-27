import axiosClient from "@/lib/axios/client";

class LoginService {
  async login(username: string, password: string) {
    
    const result = axiosClient.post("/auth/login", {
      username,
      password,});

    return result;
  }}

  export const loginService = new LoginService();