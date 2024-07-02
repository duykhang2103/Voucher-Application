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

start();
