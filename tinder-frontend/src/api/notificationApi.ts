import client from "./interseptors";

export interface Notification {
  _id: string;
  user: string;
  content: string;
  date: number;
}

export const GetNotification = async () => {
  const notifications = await client
    .get("notification/getNotifications")
    .then((res) => res.data);
  console.log(notifications);

  return notifications.data;
};

export const deleteNotifications = async () => {
  return client.get("notification/deleteNotification").then((res) => res.data);
};
