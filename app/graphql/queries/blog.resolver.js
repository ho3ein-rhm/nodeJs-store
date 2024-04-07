const { BlogType } = require("../typeDefs/blog.type");
const { GraphQLList } = require("graphql");
const { blogModel } = require("../../models/blog");
const BlogResolver = {
  type: new GraphQLList(BlogType),
  resolve: async () => {
    return await blogModel
      .find({})
      .populate([{ path: "author", path: "category" }]);
  },
};

module.exports = {
  BlogResolver,
};
