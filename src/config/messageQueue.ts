import { Queue, Worker } from "bullmq";

const queue = new Queue("email", {
  connection: {
    host: "localhost",
    port: 6379,
  },
});

const worker1 = new Worker(
  "add",
  async (job: any) => {
    console.log("add: ", job.data);
  },
  { connection: { host: "localhost", port: 6379 } }
);

const worker2 = new Worker(
  "update",
  async (job: any) => {
    console.log("update: ", job.data);
  },
  { connection: { host: "localhost", port: 6379 } }
);

const startWorkers = async () => {
  await worker1.waitUntilReady();
  worker1.on("completed", (job: any) => {
    console.log(`Job completed with result ${job.returnvalue}`);
  });
  worker1.on("failed", (job: any) => {
    console.log(`Job failed with reason ${job.failedReason}`);
  });
  worker1.on("error", (error: any) => {
    console.log(`Worker error: ${error.message}`);
  });
  await worker2.waitUntilReady();
  worker2.on("completed", (job: any) => {
    console.log(`Job completed with result ${job.returnvalue}`);
  });
  worker2.on("failed", (job: any) => {
    console.log(`Job failed with reason ${job.failedReason}`);
  });
  worker2.on("error", (error: any) => {
    console.log(`Worker error: ${error.message}`);
  });
};

export { queue, startWorkers };
