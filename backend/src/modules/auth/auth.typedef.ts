export const AuthTypeDef = /* GraphQL */ `
  type Mutation {
    register(user: RegisterInput!): User!
    login(user: LoginInput!): String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`;
