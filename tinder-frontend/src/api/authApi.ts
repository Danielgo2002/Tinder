import axios from "axios";
import { AuthData } from "../signup";

const client = axios.create({ baseURL: "http://localhost:3000" });

export const signUp = async (data: AuthData) => {
  console.log("ee", data);
  const res = await client.post("/auth/signUp", data);
  return res;
};
