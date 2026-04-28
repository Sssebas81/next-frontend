import axiosClient from "@/lib/axios/client";

class LoginService {
  async login(username: string, password: string) {
    
    const result = await axiosClient.post("/auth/login", {
      username,
      password,});

    return result.data;
  }}

  export const loginService = new LoginService();