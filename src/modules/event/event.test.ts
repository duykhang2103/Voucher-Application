import mongoose from "mongoose";
import { MONGO_URI } from "../../config/const";
import { graphql } from "graphql";
import { schema } from "../../schema";
import { describe, expect, it } from "@jest/globals";
import { messageQueue, worker1, worker2 } from "../../config/messageQueue";

/* Connecting to the database before  test. */
beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
});

describe("Events", () => {
  it("should return all events", async () => {
    const query = `
      query {
        events {
          _id
          name
        }
      }
    `;

    const result = await graphql({ schema, source: query });
    expect(result.data).toBeDefined();
    expect((result.data!.events as jest.Mock).length).toBeGreaterThan(0);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await worker1.close();
  await worker2.close();
  await messageQueue.close();
});
