const { ProductType } = require("../typeDefs/product.type");
const { GraphQLList } = require("graphql");
const { ProductSchema } = require("../../models/product");
const ProductResolver = {
  type: new GraphQLList(ProductType),
  resolve: async () => {
    return await ProductSchema.find({}).populate([
      { path: "category" },
      { path: "supplier" },
    ]);
  },
};

module.exports = {
  ProductResolver,
};
