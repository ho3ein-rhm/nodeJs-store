const { GraphQLString } = require("graphql");
const { CommnetType } = require("../typeDefs/comment.type");

const CommentResover = {
  type: CommnetType,
  args: {
    comment: { type: GraphQLString },
    user: { type: GraphQLString },
    blogID: { type: GraphQLString },
  },
  resolve: (_, args, ctx) => {
    console.log(args);
    return true;
  },
};

module.exports = {
  CommentResover,
};
