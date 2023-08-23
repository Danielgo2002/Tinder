import client from "./interseptors";

export type editUserData = {
  first_Name: number;
  last_Name: number;
  age: number;
  location: string;
  gender: string;
  summery: string;
  file: any;
};

export const editUser = async (data: editUserData) => {
  const res = await client.post("/user/edituser", data);
  return res;
};
