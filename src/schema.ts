import { createSchema } from "graphql-yoga";
import { merge } from "lodash";
import { UserTypeDef } from "./modules/user/user.typedef";
import { VoucherTypeDef } from "./modules/voucher/voucher.typedef";
import { EventTypeDef } from "./modules/event/event.typedef";
import { UserResolver } from "./modules/user/user.resolver";
import { EventResolver } from "./modules/event/event.resolver";
import { VoucherResolver } from "./modules/voucher/voucher.resolver";

export const schema = createSchema({
  typeDefs: [UserTypeDef, EventTypeDef, VoucherTypeDef],
  resolvers: merge(UserResolver, EventResolver, VoucherResolver),
});
