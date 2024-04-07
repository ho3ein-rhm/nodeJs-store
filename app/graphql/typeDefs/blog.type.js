const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require("graphql");
const { AuthorTypes, CategoryTypes } = require("./public.types");

const BlogType = new GraphQLObjectType({
  name: "blogtype",
  fields: {
    _id: { type: GraphQLString },
    author: { type: AuthorTypes },
    title: { type: GraphQLString },
    text: { type: GraphQLString },
    images: { type: GraphQLString },
    imageURL: { type: GraphQLString },
    tags: { type: new GraphQLList(GraphQLString) },
    category: {
      type: CategoryTypes,
    },
  },
});

module.exports = {
  BlogType,
};
