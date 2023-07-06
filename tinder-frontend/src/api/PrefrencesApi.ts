import axios from "axios";
import { FormPrefrencesData } from "../componnents/Preferences";
import client from "./interseptors";

export const addPrefrences = async (data: FormPrefrencesData) => {
  const res = await client.post("/auth/addPreferences", data);
  return res;
};
