import { isAxiosError } from "axios";
import { cronFetcher, fetcher, publicFetcher } from "@/services/fetcher.ts";

export const login = async (data: { username: string; password: string }) => {
  try {
    const res = await publicFetcher.post<{
      refresh_token: string;
      access_token: string;
    }>("/api/auth/login", data);
    localStorage.setItem("rivulet.refresh_token", res.data.refresh_token);
    localStorage.setItem("rivulet.access_token", res.data.access_token);
    fetcher.defaults.headers["Authorization"] = res.data.access_token;
    cronFetcher.defaults.headers["Authorization"] = res.data.access_token;
    return 200;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.status || 500;
    } else {
      return 500;
    }
  }
};
