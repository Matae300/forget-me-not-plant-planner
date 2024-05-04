const typeDefs = `
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

type User {
  _id: ID
  username: String
  email: String
  password: String
  plants: [String]!
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

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
  plants(username: String!): [Plant]
  plant(plantID: ID!): Plant
  wateringTask(wateringtaskID: ID!): WateringTaskInput
  tasks(username: String!, plantID: ID!): [Task]
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addPlant(
    plant: PlantInput!
  ): Plant
  removePlant(plantID: ID!): Plant
  addOtherTasks(
    name: String
    instructions: String
    dates: [Date]
  ): OtherTasksInput
  removeOtherTask(otherTasksId: ID!): OtherTasksInput
}

input PlantInput {
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
`;

module.exports = typeDefs;
