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

type Task {
  planting: String
  fertilizing: String
  pruning: String
  watering: String
}

input TaskInput {
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
  plants(username: String!): [Plant]
  plant(plantID: ID!): Plant
  task(taskID: ID!): Task
  tasks(username: String!, plantID: ID!): [Task] 
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
    fertilization: String!,
    tasks: [TaskInput]!
  ): Plant
  removePlant(plantID: ID!): Plant
  addTask(
    planting: String!, 
    fertilizing: String!, 
    pruning: String!, 
    watering: String
  ): Task
  removeTask(taskId: ID!): Task
}
`;

module.exports = typeDefs;
