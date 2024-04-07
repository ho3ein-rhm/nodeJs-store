const { GraphQLObjectType, GraphQLString } = require("graphql");

const AuthorTypes = new GraphQLObjectType({
  name: "AuthorType",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  },
});

const CategoryTypes = new GraphQLObjectType({
  name: "CategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
});

module.exports = {
  AuthorTypes,
  CategoryTypes,
};
