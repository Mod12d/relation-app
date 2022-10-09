import { neo4jgraphql } from "neo4j-graphql-js";

export default {
  Query: {
    getUser: (parent, args, context, resolveInfo) => {
      return neo4jgraphql(parent, args, context, resolveInfo);
    },
  },
};
