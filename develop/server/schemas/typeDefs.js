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
  plantName: String!
  description: String
  photoUrl: String
  sunExposure: String
  growingMonths: String
  bloomingMonths: String
  wateringTask: WateringTask!
  otherTasks: [OtherTasks]
  userNotes: String
}

type WateringTask {
  instructions: String
  frequencyCount: Int
  frequencyUnit: String
  frequencyInterval: Int
}

input WateringTaskInput {
  instructions: String
  frequencyCount: Int
  frequencyUnit: String
  frequencyInterval: Int
}

type OtherTasks {
  name: String
  instructions: String
  dates: [String]
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
  wateringTask(wateringTaskId: ID!): WateringTask
  singleOtherTask(otherTasksId: ID!): OtherTasks
  allOtherTasksByUsername(username: String!): [OtherTasks]
  me: User
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addPlant(
    plantName: String!
    description: String
    photoUrl: String
    sunExposure: String
    growingMonths: String
    bloomingMonths: String
    wateringTask: WateringTaskInput!
    userNotes: String
  ): Plant
  removePlant(plantId: ID!): Plant
  addOtherTask(
    plantId: ID!,
    name: String
    instructions: String
    dates: [String]
  ): OtherTasks
  removeOtherTask(otherTasksId: ID!): OtherTasks
}
`;

module.exports = typeDefs;