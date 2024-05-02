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
  name: String
  description: String
  wateringFrequency: Int
  wateringInstructions: String
  sunExposure: String
  growingMonths: String
  bloomSeason: String
  whenToPlant: String
  spacing: String
  fertilization: String
  tasks: [Task]!
}

type Task {
  _id: ID
  planting: String
  fertilizing: String
  pruning: String
  watering: String
}

type Auth {
  token: ID!
  user: User
}

type Query {
  users: [User]
  user(username: String!): User
  plants(username: String!): [Plant]
  plant(_Id: ID!): Plant
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
    bloomSeason: String!,
    whenToPlant: String!,
    spacing: String!,
    fertilization: String!
  ): Plant
  removePlant(plantID: ID!): Plant
  addTask(
    plantId: ID!
    planting: String!, 
    fertilizing: String!, 
    pruning: String!, 
    watering: String!
  ): Task
  removeTask(taskId: ID!): Task
}
`;

module.exports = typeDefs;