import { gql } from "@apollo/client";

export default gql`
  type getUser {
    users: [User!]!
  }
  type Query {
    tweets: [Tweet]
    tweetsWithUsers: [Tweet!]!
    user(id: String): User
    users(limit: Int): [User]
  }

  type Tweet {
    author_id: String!
    created_at: String!
    id: String!
    text: String!
    user: User!
  }

  type User {
    id: String
    name: String
    username: String
    profile_image_url: String
  }
`;
