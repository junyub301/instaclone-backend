import { gql } from "apollo-server";

export default gql`
    type Query {
        seePhothSaves(username: String!): Save
    }
`;
