const { ProductType } = require("../typeDefs/product.type");
const { GraphQLList, GraphQLString } = require("graphql");
const { ProductSchema } = require("../../models/product");
const ProductResolver = {
  type: new GraphQLList(ProductType),
  args: {
    category: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const category = args.category ? args : {};
    return await ProductSchema.find(category).populate([
      { path: "category" },
      { path: "supplier" },
    ]);
  },
};

module.exports = {
  ProductResolver,
};
