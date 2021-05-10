import { processHashtags } from "../photos.utils";
import { protectedResolver } from "../../users/users.utils";
import client from "../../client";

export default {
    Mutation: {
        editPhoto: protectedResolver(
            async (_, { id, caption }, { loggedInUser }) => {
                const oldPhoto = await client.photo.findFirst({
                    where: { id, userId: loggedInUser.id },
                    include: {
                        hashtags: {
                            select: {
                                hashtag: true,
                            },
                        },
                    },
                });
                if (!oldPhoto) {
                    return {
                        ok: false,
                        error: "Photo not found",
                    };
                }
                const photo = await client.photo.update({
                    where: {
                        id,
                    },
                    data: {
                        caption,
                        hashtags: {
                            disconnect: oldPhoto.hashtags,
                            connectOrCreate: processHashtags(caption),
                        },
                    },
                });
                return {
                    ok: true,
                };
            }
        ),
    },
};
