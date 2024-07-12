import mongoose from "mongoose";
import { MONGO_URI } from "../../config/const";
import { graphql } from "graphql";
import { schema } from "../../schema";
import { describe, expect, it } from "@jest/globals";
import { messageQueue, worker1, worker2 } from "../../config/messageQueue";
import Voucher from "./voucher.model";

/* Connecting to the database before  test. */
beforeAll(async () => {
  await mongoose.connect(MONGO_URI);
});

describe("Vouchers", () => {
  it("should return all vouchers", async () => {
    const query = `
      query {
        vouchers {
          _id
          code
        }
      }
    `;

    const result = await graphql({ schema, source: query });
    expect(result.data).toBeDefined();
    expect((result.data!.vouchers as jest.Mock).length).toBeGreaterThan(0);
  });

  it("should create 1 voucher", async () => {
    const mockVoucher = {
      code: "123456",
      discount: 20,
      eventId: "6684ac07a48b1733242cf815",
      userId: "6683b33bb867d48ea5d66e4a",
      expireAt: "2022-07-23T00:00:00.000Z",
    };
    const query = `
      mutation CreateVoucher($voucher: NewVoucherInput!){
        createVoucher(voucher: $voucher) {
          _id
          code
        }
      }
    `;

    const variables = { voucher: mockVoucher };
    await graphql({
      schema,
      source: query,
      variableValues: variables,
    });
    const voucher = await Voucher.findOne({ code: mockVoucher.code });
    expect(voucher).not.toBeNull();
    expect(voucher!.eventId!.toString()).toEqual(mockVoucher.eventId);
    expect(voucher!.userId!.toString()).toEqual(mockVoucher.userId);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await worker1.close();
  await worker2.close();
  await messageQueue.close();
});
