export const EventTypeDef = /* GraphQL */ `
  type Query {
    events: [Event!]!
    eventById(_id: ID!): Event
    eventByName(name: String!): Event
  }

  type Mutation {
    createEvent(event: NewEventInput!): Event
    startEdittingEvent(_id: ID!): Boolean
    checkStillEditting(_id: ID!): Boolean
    updateEvent(event: UpdateEventInput!): Event
    deleteEvent(_id: ID!): Event
  }

  type Event {
    _id: ID!
    name: String!
    date: String!
    location: String
    description: String
    quantity: Int!
    isEditting: Boolean
    expiredEdittingDate: String
  }

  input NewEventInput {
    name: String!
    date: String!
    location: String
    description: String
    quantity: Int!
  }

  input UpdateEventInput {
    _id: ID!
    name: String
    date: String
    location: String
    description: String
    quantity: Int
  }
`;
