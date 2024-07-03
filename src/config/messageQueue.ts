import { Job, Queue, Worker } from "bullmq";
import { QueueService } from "../modules/queue/queue.service";

const messageQueue = new Queue("add", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const worker1 = new Worker(
  "add",
  async (job: Job) => {
    const info = await QueueService.workAddItem(job);
    return info;
  },
  {
    connection: { host: "localhost", port: 6379 },
    autorun: false,
  }
);

const worker2 = new Worker(
  "update",
  async (job: Job) => {
    const info = await QueueService.workUpdateItem(job);
    return info;
  },
  {
    connection: { host: "localhost", port: 6379 },
    autorun: false,
  }
);

const startWorkers = async () => {
  worker1.on("completed", (job: Job) => {
    console.log(`Job completed with result ${job.returnvalue}`);
  });
  worker1.on("failed", (job: any) => {
    console.log(`Job failed with reason ${job.failedReason}`);
  });
  worker1.on("error", (error: any) => {
    console.log(`Worker error: ${error}`);
  });

  worker2.on("completed", (job: Job) => {
    console.log(`Job completed with result ${job.returnvalue}`);
  });
  worker2.on("failed", (job: any) => {
    console.log(`Job failed with reason ${job.failedReason}`);
  });
  worker2.on("error", (error: any) => {
    console.log(`Worker error: ${error}`);
  });

  await worker1.run();
  await worker2.run();
};

export { messageQueue, worker1, worker2, startWorkers };
