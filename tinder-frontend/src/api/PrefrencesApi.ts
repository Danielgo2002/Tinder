import axios from "axios";
import { FormPrefrencesData } from "../Preferences";

const client = axios.create({ baseURL: "http://localhost:3000" });

export const addPrefrences = async (data: FormPrefrencesData) => {
  console.log("work", data);
  const res = await client.post("/auth/addPreferences", data);
  return res;
};
