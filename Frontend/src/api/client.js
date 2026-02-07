const API_BASE_URL = "http://localhost:8000/api";

export const getToken = () => localStorage.getItem("jwtToken");
export const setToken = (token) => localStorage.setItem("jwtToken", token);
export const clearToken = () => localStorage.removeItem("jwtToken");

export const request = async (path, options = {}) => {
  const { auth = true, headers = {}, ...rest } = options;
  const nextHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  };

  if (auth) {
    const token = getToken();
    if (token) {
      nextHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: nextHeaders,
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    const error = new Error(data?.message || data?.error || "Request failed");
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};
