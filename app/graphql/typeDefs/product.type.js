const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} = require("graphql");
const { AuthorTypes, CategoryTypes } = require("./public.types");

const FeaturesType = new GraphQLObjectType({
  name: "features",
  fields: {
    length: { type: GraphQLString },
    height: { type: GraphQLString },
    width: { type: GraphQLString },
    weight: { type: GraphQLString },
    colors: { type: new GraphQLList(GraphQLString) },
    madein: { type: GraphQLString },
  },
});

const ProductType = new GraphQLObjectType({
  name: "ProductType",
  fields: {
    _id: { type: GraphQLString },
    title: { type: GraphQLString },
    short_text: { type: GraphQLString },
    text: { type: GraphQLString },
    images: { type: GraphQLString },
    tags: { type: GraphQLString },
    category: { type: CategoryTypes },
    price: { type: GraphQLInt },
    discount: { type: GraphQLInt },
    count: { type: GraphQLInt },
    type: { type: GraphQLString }, //virtual - physici
    format: { type: GraphQLString },
    supplier: { type: AuthorTypes },
    features: { type: FeaturesType },
  },
});

module.exports = {
  ProductType,
};
