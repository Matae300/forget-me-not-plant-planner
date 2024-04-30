const typeDefs = `
type User {
  _id: ID
  username: String
  email: String
  password: String
  plants: [String]!
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

input createTaskInput {
  planting: String
  fertilizing: String
  pruning: String
  watering: String
}

type Task {
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
  me: User
  Plants(name: String!, tasks: [String]!): [Plant]
  Plant(plantID: ID!): Plant
  addTask(input: createTask): Tasks
  Task(taskId: ID!): Tasks
}

type Mutation {
  addUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  addPlant(name: String!, tasks: [String]!): Plant
  updatePlant(name: String!): Plant
  removePlant(plantID: ID!): Plant
  addTask(input: createTaskInput!): Task
  updateTask(taskId: ID!, input: createTaskInput!): Task
  removeTask(taskId: ID!): Task
}
`;

module.exports = typeDefs;