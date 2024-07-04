import { rule, shield } from "graphql-shield";
import { verifyToken } from "../config/auth";
import { head } from "lodash";

const isLogged = rule()(async (_parent, _args, ctx) => {
  const { authorization } = await ctx.request.headers["headersInit"];
  if (!authorization) {
    return false;
  }

  const token = authorization.replace("Bearer", "").trim();
  const { userId } = (await verifyToken(token)) as { userId: string };
  if (userId) {
    ctx.userId = userId;
    return true;
  }
  return false;
});

const permissions = shield({
  Query: {},
  Mutation: {
    useVoucher: isLogged,
  },
});

export default permissions;
