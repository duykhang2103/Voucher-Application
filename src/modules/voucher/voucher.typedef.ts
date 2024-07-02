export const VoucherTypeDef = /* GraphQL */ `
  type Query {
    vouchers: [Voucher!]!
    voucherById(_id: ID!): Voucher
  }

  type Mutation {
    createVoucher(voucher: NewVoucherInput!): Voucher
    updateVoucher(voucher: UpdateVoucherInput!): Voucher
    deleteVoucher(_id: ID!): Voucher
  }

  type Voucher {
    _id: ID!
    code: String!
    discount: Float!
    eventId: ID!
    userId: ID
    status: String!
    expireAt: String!
    description: String
  }

  input NewVoucherInput {
    discount: Float!
    eventId: ID!
    userId: ID!
    expireAt: String!
    description: String
  }

  input UpdateVoucherInput {
    _id: ID!
    code: String
    discount: Float
    userId: ID
    status: String
    expireAt: String
    description: String
  }
`;
