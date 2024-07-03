import { Job } from "bullmq";
import { SMTP_USERNAME } from "../../config/const";
import transporter from "../../config/mail";
import { messageQueue } from "../../config/messageQueue";
import { IVoucher } from "../voucher/voucher.model";

const addItem = async ({ email, code }: { email: string; code: string }) => {
  await messageQueue.add("add", { email, code });
};

const updateItem = async ({ email, code }: { email: string; code: string }) => {
  await messageQueue.add("update", { email, code });
};

const workAddItem = async (job: Job) => {
  const info = transporter.sendMail({
    from: SMTP_USERNAME,
    to: job.data.email,
    subject: "Voucher",
    text: `Your voucher code is ${job.data.code}`,
  });
  return info;
};

const workUpdateItem = async (job: Job) => {
  console.log(`Updating item: ${job.data}`);
  return job.data;
};

export const QueueService = {
  addItem,
  updateItem,
  workAddItem,
  workUpdateItem,
};
