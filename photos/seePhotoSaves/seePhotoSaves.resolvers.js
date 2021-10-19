import client from "../../client";

export default {
    Query: {
        seePhothSaves: (_, { username }) =>
            client.save.findUnique({ where: { userName: username } }),
    },
};
