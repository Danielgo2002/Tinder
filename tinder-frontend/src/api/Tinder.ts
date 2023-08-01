import client from "./interseptors";

export interface Users {
  message: string;
  data: User[];
  status: string;
}
export interface MyUsers {
  message: string;
  data: MyUser[];
  status: string;
}
export interface User {
  _id: string;
  gender: string;
  first_Name: string;
  last_Name: string;
  age: number;
  location: string;
  summery: string;
  likes: string[];
  image: string;
}
export interface MyUser {
  _id: string;
  gender: string;
  first_Name: string;
  last_Name: string;
  age: number;
  location: string;
  summery: string;
  image: string;
  preferences: Prefrences;
  notifications: notification[];
}
export interface notification {
  _id: string;
  content: string;
  date: number;
  user: string[];
}

export interface Images {
  Images: Image[];
}
export interface Image {
  Image: File;
}

export interface Prefrences {
  gender: string;
  MinAge: number;
  MaxAge: number;
  location: string;
}

export const GetUsers = async (): Promise<Users> => {
  return client.get("user/getUsers").then((res) => res.data);
};

export const GetFilterUsers = async (): Promise<Users> => {
  return client.get("user/getFilterUsers").then((res) => res.data);
};

export const GetImages = async (): Promise<Images> => {
  return client.get("uploads").then((res) => res.data);
};

export const LikeUser = async (data: { reciverID: string }) => {
  return client.post("/user/likes", data).then((res) => res.data);
};
export const DislikeUser = async (data: { reciverID: string }) => {
  return client.post("/user/dislikes", data).then((res) => res.data);
};

export const GetMyUser = async (): Promise<MyUser> => {
  return client.get("user/getMyUser").then((res) => res.data);
};
