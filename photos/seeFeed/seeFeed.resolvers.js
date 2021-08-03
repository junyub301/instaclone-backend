import { protectedResolver } from "../../users/users.utils";
import client from "../../client";

export default {
    Query: {
        seeFeed: protectedResolver(async (_, { offset }, { loggedInUser }) =>
            client.photo.findMany({
                take: 2,
                skip: offset,
                where: {
                    OR: [
                        {
                            user: {
                                followers: {
                                    some: {
                                        id: loggedInUser.id,
                                    },
                                },
                            },
                        },
                        {
                            userId: loggedInUser.id,
                        },
                    ],
                },
                orderBy: {
                    createdAt: "desc",
                },
            })
        ),
    },
};
