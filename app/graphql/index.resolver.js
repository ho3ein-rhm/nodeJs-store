const {
  GraphQLObjectType,
  GraphQLSchema,
} = require("graphql");
const { BlogResolver } = require("./queries/blog.resolver");
const { ProductResolver } = require("./queries/product.resolver");
const { childCaregoryResolver } = require("./queries/childCategory.resolver");
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    blogs: BlogResolver,
    product: ProductResolver,
    childCategory : childCaregoryResolver
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
