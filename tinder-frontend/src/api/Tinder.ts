import axios from "axios";
import client from "./interseptors";

export interface Users {
  message: string;
  data: User[];
  status: string;
}
export interface User {
  first_Name: string;
  last_Name: string;
  age: number;
  location:string
  summery: string;
}

export const GetUsers = async (): Promise<Users> => {
  return client.get("user/getUsers").then((res) => res.data);
};
