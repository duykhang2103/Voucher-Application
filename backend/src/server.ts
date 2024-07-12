import app from "./app";
import connectToDB from "./config/db";
import { startWorkers } from "./config/messageQueue";
import { redis } from "./config/redis";

const start = async () => {
  await connectToDB();
  await redis.connect();
  startWorkers();
  app.listen(3000, () => {
    console.log("Server is running on: http://localhost:3000");
  });
};

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION!, ", err);
  console.log("UNHANDLED REJECTION! Shutting down...");
  process.exit(1);
});

start();
