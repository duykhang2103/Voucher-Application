import mongoose from "mongoose";

export const runTransactionWithRetry = async (
  txnFunc: (data: any, session: mongoose.ClientSession) => Promise<any>,
  session: mongoose.ClientSession,
  data: any
) => {
  try {
    // console.log("Starting transaction ...");
    const res = await txnFunc(data, session);
    // console.log("Transaction succeeded.");
    return res;
  } catch (error: any) {
    console.log(
      "Transaction aborted. Caught exception during transaction: ",
      error
    );

    // If transient error, retry the whole transaction
    if (error.hasErrorLabel("TransientTransactionError")) {
      console.log("TransientTransactionError, retrying transaction ...");
      await runTransactionWithRetry(txnFunc, session, data);
    } else {
      throw error;
    }
  }
};

export const commitWithRetry = async (
  session: mongoose.mongo.ClientSession
) => {
  try {
    // console.log("Committing transaction ...");
    await session.commitTransaction();
    session.endSession();
    // console.log("Transaction committed.");
  } catch (error: unknown) {
    console.log("Error during commit ...");
    throw error;
  }
};
