import { request } from "./client";

export const login = (credentials) =>
  request("/login/loginUser", {
    method: "POST",
    auth: false,
    body: JSON.stringify(credentials),
  });

export const register = (payload) =>
  request("/register/create", {
    method: "POST",
    auth: false,
    body: JSON.stringify(payload),
  });

export const verifyToken = () => request("/protected");
