import axios from "axios";
import { AuthData } from "../signup";
import client from "./interseptors";

// const client = axios.create({ baseURL: "http://localhost:3000" });

// export const signUp = async (data: AuthData) => {
//   const res = await client.post("/auth/signUp", data, {

//   })

//   return res;
// };
// const client = axios.create({ baseURL: "http://localhost:3000" });

// export const signUp = async (data: AuthData) => {
//   try {
//     const res = await client.post("/auth/signUp", data);
//     const access_Token = res.data.access_Token;

//     localStorage.setItem("access_Token", access_Token);
//     const storedAccessToken = localStorage.getItem("access_Token");
//     console.log("access_Token", storedAccessToken);

//     return res;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

export async function signUp(data: AuthData) {
  try {
    const response = await client.post("/auth/signUp", data);
    if (response.data.access_Token && response.data.refresh_token) {
      localStorage.setItem("accessToken", response.data.access_Token);
      localStorage.setItem("refreshToken", response.data.refresh_token);
    }
    return response;
  } catch (error) {
    throw error;
  }
}
