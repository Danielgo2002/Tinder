import client from "./interseptors";

export const BlockUser = async (data: { blockedUserId: string }) => {
  return client.post("/user/blockUser", data).then((res) => res.data);
};
export const UnBlockUser = async (data: { UnblockedUserId: string }) => {

  return client.post("/user/UnBlockUser", data).then((res) => res.data);
};
