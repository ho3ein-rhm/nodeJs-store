const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLScalarType,
} = require("graphql");
const { toObject, parseLiteral } = require("../utils");

const AnyType = new GraphQLScalarType({
  name: "anyType",
  parseValue: toObject,
  serialize: toObject,
  parseLiteral: parseLiteral,
});

const AuthorTypes = new GraphQLObjectType({
  name: "AuthorType",
  fields: {
    _id: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
  },
});

const ChildCategoryTypes = new GraphQLObjectType({
  name: "ChildCategoryTypes",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    parent: { type: GraphQLString },
  },
});

const CategoryTypes = new GraphQLObjectType({
  name: "CategoryType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    parent: { type: GraphQLString },
    children: { type: new GraphQLList(AnyType) },
  },
});

module.exports = {
  AuthorTypes,
  CategoryTypes,
};
