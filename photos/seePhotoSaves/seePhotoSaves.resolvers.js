import client from "../../client";

export default {
    Query: {
        seePhothSaves: (_, { id }) =>
            client.save.findMany({ where: { userId: id } }),
    },
};
