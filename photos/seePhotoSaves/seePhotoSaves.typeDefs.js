import { gql } from "apollo-server";

export default gql`
    type Query {
        seePhothSaves(userId: Int!): [Save]
    }
`;
