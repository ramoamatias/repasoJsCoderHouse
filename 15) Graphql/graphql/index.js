const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { types } = require("./types.js");
const { resolvers } = require("./resolver.js");

const graphqlSchema = makeExecutableSchema({
  typeDefs: types,
  resolvers,
});

module.exports = graphqlHTTP({
  graphiql: true,
  schema: graphqlSchema,
});
