export const UserTypeDef = /* GraphQL */ `
  type Query {
    users: [User!]!
    userByName(name: String!): User
    userById(id: ID!): User
  }

  type Mutation {
    signUp(user: NewUserInput!): User
    signIn(email: String!, password: String!): User
  }

  type User {
    id: ID!
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
