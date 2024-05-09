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
  wateringTask: WateringTask!
  otherTasks: [OtherTasks]
}

type WateringTask {
  _id: ID
  instructions: String
  frequencyCount: Int
  frequencyUnit: String
  frequencyInterval: Int
  createdAt: String
}

input WateringTaskInput {
  instructions: String
  frequencyCount: Int
  frequencyUnit: String
  frequencyInterval: Int
}

type OtherTasks {
  _id: ID
  taskName: String
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
  plant(_id: ID!): Plant
  allPlants: [Plant]
  wateringTask(wateringTaskId: ID!): WateringTask
  singleOtherTask(otherTasksId: ID!): OtherTasks
  me: User
  myPlants: [Plant]
  myTasks: [OtherTasks]
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addPlant(
    name: String!
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
    taskName: String
    instructions: String
    dates: [String]
  ): OtherTasks
  removeOtherTask(otherTasksId: ID!): OtherTasks
}
`;

module.exports = typeDefs;