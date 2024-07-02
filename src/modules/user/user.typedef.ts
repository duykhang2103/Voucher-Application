export const UserTypeDef = /* GraphQL */ `
  type Query {
    users: [User!]!
    userByName(name: String!): User
    userById(_id: ID!): User
  }

  type Mutation {
    createUser(user: NewUserInput!): User
    signIn(email: String!, password: String!): User
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
`;
