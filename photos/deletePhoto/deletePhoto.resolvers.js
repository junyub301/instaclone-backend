import { protectedResolver } from "../../users/users.utils";
import client from "../../client";

export default {
    Mutation: {
        deletePhoto: protectedResolver(async (_, { id }, { loggedInuser }) => {
            const pohoto = await client.photo.findUnique({
                where: { id },
                select: {
                    userId: true,
                },
            });
            if (!photo) {
                return {
                    ok: false,
                    error: "Photo not found",
                };
            } else if (photo.userId !== loggedInuser.id) {
                return {
                    ok: false,
                    error: "Not authorized.",
                };
            } else {
                await client.photo.delete({
                    where: {
                        id,
                    },
                });
            }
            return {
                ok: true,
            };
        }),
    },
};
