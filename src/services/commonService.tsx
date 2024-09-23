import { baseUrl } from "../environment/environment";
import instance from "./httpInterceptor";

export const loginAdmin = (payload) => {
  const url = `${baseUrl}/auth/login`;
  return instance.post(url, payload);
};