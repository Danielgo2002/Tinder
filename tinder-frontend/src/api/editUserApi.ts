import client from "./interseptors";

export type editUserData = {
  first_Name: string;
  last_Name: string;
  age: number;
  location: string;
  gender: string;
  summery: string;
  file: any;
};

export const editUser = async (data: editUserData) => {
  const res = await client.post("/user/edituser", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
