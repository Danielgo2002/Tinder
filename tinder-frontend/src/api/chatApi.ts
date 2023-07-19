import client from "./interseptors";
import { Users } from "./Tinder";


export const GetChatUsers = async (): Promise<Users> => {
    return client.get("user/getChatUsers").then((res) => res.data);
  };