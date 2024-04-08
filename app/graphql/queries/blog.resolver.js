const { BlogType } = require("../typeDefs/blog.type");
const { GraphQLList } = require("graphql");
const { blogModel } = require("../../models/blog");
const {
  verifyAcsessTokeninGraphQL,
} = require("../../http/middlewares/verifyAcessToken");
const BlogResolver = {
  type: new GraphQLList(BlogType),
  resolve: async (_, args, context) => {
    const { req } = context;
    console.log('here...! in resolve')
    req.user = await verifyAcsessTokeninGraphQL(req);
    console.log(req.user);
    return await blogModel
      .find({})
      .populate([{ path: "author", path: "category" }]);
  },
};

module.exports = {
  BlogResolver,
};
