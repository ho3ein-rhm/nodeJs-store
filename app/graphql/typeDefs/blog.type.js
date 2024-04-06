const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const BlogType = new GraphQLObjectType({
  name: " blogtype",
  fields: {
    author: { type: GraphQLString },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    images: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: {
      type: GraphQLString,
    },
  },
});
