import axios from "axios";
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "./Navigateto";

const client = axios.create({ baseURL: "http://localhost:3000" });

function authorizationRequest(config: any, tokenType: string) {
  let token = localStorage.getItem(tokenType) as string;
  if (token != null) {
    if (config.defaults) {
      config.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      config.headers["Authorization"] = "Bearer " + token;
    }

    // config.headers.set("Authorization", "Bearer " + token);
  } else {
    if (tokenType === "refreshToken") {
      NavigateTo("/");
    }
  }
}

client.interceptors.request.use(
  (config) => {
    if (config.url === "/auth/refresh") {
      authorizationRequest(config, "refreshToken");
    } else {
      authorizationRequest(config, "accessToken");
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalReq = error.config;
    if (error.response.ststus === 401 && originalReq.url === "/auth/refresh") {
      NavigateTo("/");
      return Promise.reject(error);
    }
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      return client.get("/auth/refresh").then((res) => {
        if (res?.status === 201) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(res.data.access_Token)
          );
          authorizationRequest(client, "accessToken");
          return client(originalReq);
        }
      });
    }
    return Promise.reject(error);
  }
);

export default client;
