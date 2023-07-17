const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const http = require("http");
const cors = require("cors");
const { json } = require("body-parser");
const typeDefs = require("./typedefs");
const resolvers = require("./resolvers");
const path = require("path");

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false
  });
  const { default: graphqlUploadExpress } = await import(
    "graphql-upload/graphqlUploadExpress.mjs"
  );
  await server.start();
  const app = express();

  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "uploads")));

  app.use(
    "/graphql",
    cors(),
    graphqlUploadExpress(),
    expressMiddleware(server,{
      context: async ({ req }) => {},
    }));
  await new Promise((resolve) => app.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}
startServer();
