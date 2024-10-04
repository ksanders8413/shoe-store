import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

export const mailtrapClient = new MailtrapClient({
  endpoint: process.env.MAILTRAP_ENDPOINT,
  token: process.env.MAILTRAP_TOKEN,
});

export const sender = {
  email: "mailtrap@fuegokickz.com",
  name: "Fuego Kickz",
};
export const recipients = [
  {
    email: "awhitman1987@yahoo.com",
  },
];


