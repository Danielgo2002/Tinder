import client from "./interseptors";

export interface Notification {
    user: string;
    content: string;
    date : number;
  }

export const GetFilterUsers = async (): Promise<Notification> => {
    return client.get("user/getFilterUsers").then((res) => res.data);
  };