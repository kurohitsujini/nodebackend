const { ApolloServer } = require("@apollo/server");
const typeDefs = `
  interface Node {
    id: Int!
  }
  scalar Upload
  type Persona implements Node {
    id: Int!
    fullname: String!
    points: Int!
    position: Int!
    active: Boolean!
    empleados_id: Int!
    empleados: [Empleados]
    image: String
  }
  type Empleados implements Node {
    id: Int!
    name: String!
    department: String!
  }
  type PageInfo {
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
    endCursor: String
  }
  type Query {
    persona: [Persona]
    empleado: [Empleados]
    personas(id: Int!): [Persona]
  }
  type Mutation {
    createPersona(
      fullname: String!
      points: Int!
      empleados_id: Int!
      image: Upload
    ): Persona!
    updatePersona(
      id: Int!
      fullname: String
      points: Int
      empleados_id: Int
      image: Upload
    ): Persona!
    deletePersona(id: Int!): Persona!
  }
`;
module.exports = typeDefs;
