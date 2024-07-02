import { Queue, Worker } from "bullmq";

const addItem = async (queue: Queue, data: any) => {
  await queue.add("add", data);
};

const updateItem = async (queue: Queue, data: any) => {
  await queue.add("update", data);
};

export const QueueService = {
  addItem,
  updateItem,
};
