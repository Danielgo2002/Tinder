import { Message } from "../chat/Conversation";
import client from "./interseptors";
import { Users } from "./Tinder";

export const GetChatUsers = async (): Promise<Users> => {
  return client.get("user/getChatUsers").then((res) => res.data);
};

export const getMessagesForChat = async (
  reciverId: string
): Promise<Message[]> => {
  return client
    .post("message/getMessages", { reciverId })
    .then((res) => res.data);
};
