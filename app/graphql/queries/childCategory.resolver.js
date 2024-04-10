const { GraphQLList, GraphQLString } = require("graphql");
const { categoryModel } = require("../../models/category");
const { CategoryTypes } = require("../typeDefs/public.types");
const childCaregoryResolver = {
  type: new GraphQLList(CategoryTypes),
  args: {
    parent: { type: GraphQLString },
  },
  resolve: async (_, args) => {
    const title = args.parent || undefined;
    if (title) {
      return await categoryModel.find({
        title: { $regex: new RegExp(title, "i") },
      });
    }
    return await categoryModel.find({});
  },
};

module.exports = {
  childCaregoryResolver,
};
