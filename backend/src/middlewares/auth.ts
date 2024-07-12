import { rule, shield } from "graphql-shield";
import { verifyToken } from "../utils/auth";

const isLogged = rule()(async (_parent, _args, ctx) => {
  const { authorization } = await ctx.request.headers["headersInit"];
  if (!authorization) {
    return false;
  }

  const token = authorization.replace("Bearer", "").trim();
  const { userId, email, role } = await verifyToken(token);
  if (userId) {
    ctx.userId = userId;
    ctx.email = email;
    ctx.role = role;
    return true;
  }
  return false;
});

const permissions = shield({
  Query: {},
  Mutation: {
    // useVoucher: isLogged,
  },
});

export default permissions;
