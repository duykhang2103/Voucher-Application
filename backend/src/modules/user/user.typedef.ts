export const UserTypeDef = /* GraphQL */ `
  type Query {
    users: [User!]!
    usersByName(name: String!): [User]
    userById(_id: ID!): User
  }

  type Mutation {
    updateMe(payload: UpdateUserInput!): User
    update(userId: ID!, payload: UpdateUserInput!): User
    delete(userId: ID!): Boolean
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
  }

  input NewUserInput {
    name: String!
    email: String!
    password: String
  }

  input UpdateUserInput {
    name: String
    email: String
    password: String
  }
`;
