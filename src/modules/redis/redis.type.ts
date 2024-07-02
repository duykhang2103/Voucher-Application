export const RedisTypeDef = /* GraphQL */ `
  type Query {
    redisGet(key: String!): String
  }

  type Mutation {
    redisSet(key: String!, value: String!): String
  }
`;
