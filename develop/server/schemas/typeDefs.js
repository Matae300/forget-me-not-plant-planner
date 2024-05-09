const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
  plants: [Plant]!
}

type Plant {
  _id: ID!
  name: String!
  description: String
  photoUrl: String
  sunExposure: String
  growingMonths: String
  bloomingMonths: String
  wateringTask: WateringTask!
  userNotes: [UserNotes]
}

type WateringTask {
  _id: ID!
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

type UserNotes {
  _id: ID
  noteName: String
  noteText: String
}

type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]
  user(username: String!): User
  plant(_id: ID!): Plant
  wateringTask(wateringTaskId: ID!): WateringTask
  singleUserNotes(userNotesId: ID!): UserNotes
  me: User
  myPlants: [Plant]
  myNotes: [UserNotes]
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
  ): Plant
  removePlant(plantId: ID!): Plant
  addUserNotes(
    plantId: ID!
    noteName: String!
    noteText: String!
  ): UserNotes
  removeUserNotes(userNotesId: ID!): UserNotes
}
`;

module.exports = typeDefs;