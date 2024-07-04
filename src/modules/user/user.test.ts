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

describe("Users", () => {
  it("should return all users", async () => {
    const query = `
      query {
        users {
          _id
          name
        }
      }
    `;

    const result = await graphql({ schema, source: query });
    expect(result.data).toBeDefined();
    expect(result.data!.users).toBeDefined();
    expect((result.data!.users as jest.Mock).length).toBeGreaterThan(0);
  });

  it("should return user having name khang", async () => {
    const query = `
      query GetUserByName($name: String!){
        userByName (name: $name) {
          _id
          name
          email
        }
      }
    `;
    const variables = {
      name: "khang",
    };

    const result = await graphql({
      schema,
      source: query,
      variableValues: variables,
    });
    expect(result.data).toBeDefined();
    expect((result.data!.userByName as jest.Mock).name).toEqual("KHANG");
  });
});

/* Closing database connection after  test. */
afterAll(async () => {
  await mongoose.connection.close();
  await worker1.close();
  await worker2.close();
  await messageQueue.close();
});
