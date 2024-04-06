const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
} = require("graphql");
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: {
      type: new GraphQLObjectType({
        name: "blogsType",
        fields: {
          id: { type: GraphQLInt },
          title: { type: GraphQLString },
          text: { type: GraphQLString },
          image: { type: GraphQLString },
        },
      }),
      resolve: () => {
        return {
          id: 1,
          title: "blog title",
          text: "blog test",
          image: "blog image",
        };
      },
    },
  },
});

const RooyMutations = new GraphQLObjectType({
  name: "Mutations",
  fields: {},
});

const graphQlSchema = new GraphQLSchema({
  query: RootQuery,
  // mutation: RooyMutations,
});

module.exports = {
  graphQlSchema,
};
