const typeDefs = `
type User {
  _id: ID
  username: String
  email: String
  password: String
  plants: [Plant]!
}

type Plant {
  _id: ID
  name: String!
  description: String
  photoUrl: String
  sunExposure: String
  growingMonths: String
  bloomingMonths: String
  wateringTask: WateringTaskInput!
  otherTasks: [OtherTasksInput]
  userNotes: String
}

input WateringTaskInput {
  instructions: String
  frequencyCount: Int
  frequencyUnit: String
  frequencyInterval: Int
}

input OtherTasksInput {
  name: String
  instructions: String
  dates: [Date]
}

type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]
  user(username: String!): User
  plants(username: String!): [Plant]
  plant(_id: ID!): Plant
  wateringTask(wateringtaskID: ID!): WateringTaskInput
  singleOtherTasks(otherTasksId: ID!): OtherTasksInput
  OtherTasks(username: String!): [OtherTasksInput]
  me: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth

  addPlant(
    name: String!,
    description: String!,
    wateringFrequency: Int!,
    wateringInstructions: String!,
    sunExposure: String!,
    growingMonths: String!,
    bloomingMonths: String!,
    wateringTask: WateringTaskInput!,
    userNotes: String
  ): Plant

  removePlant(plantId: ID!): Plant

  addOtherTasks(
    name: String
    instructions: String
    dates: [Date]
  ): OtherTasksInput

  removeOtherTask(otherTasksId: ID!): OtherTasksInput
}
`;

module.exports = typeDefs;
