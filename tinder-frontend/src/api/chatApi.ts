import { Message, Response } from "../chat/Conversation";
import client from "./interseptors";
import { ResponseUsers, Users } from "./Tinder";

export const GetChatUsers = async (): Promise<ResponseUsers> => {
  return client.get("user/getChatUsers").then((res) => res.data);
};

export const getMessagesForChat = async (
  reciverId: string
): Promise<Response> => {
  return client
    .post("message/getMessages", { reciverId })
    .then((res) => res.data);
};
