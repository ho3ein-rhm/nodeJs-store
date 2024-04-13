const { GraphQLObjectType, GraphQLString, GraphQLBoolean } = require("graphql");
const { AuthorTypes } = require("./public.types");

const CommnetParentType = new GraphQLObjectType({
  name: "CommnetParentType",
  fields: {
    user: { type: AuthorTypes },
    comment: { type: GraphQLString },
  },
});

const CommnetType = new GraphQLObjectType({
  name: "CommnetType",
  fields: {
    user: { type: AuthorTypes },
    comment: { type: GraphQLString },
    parent: { type: CommnetParentType },
    show: { type: GraphQLBoolean },
    openToComment: { type: GraphQLBoolean },
  },
});

module.exports = {
  CommnetType,
};
