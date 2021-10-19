import { protectedResolver } from "../../users/users.utils";
import client from "../../client";

export default {
    Mutation: {
        toggleSave: protectedResolver(async (_, { id }, { loggedInUser }) => {
            const photo = await client.photo.findUnique({
                where: { id },
                include: {
                    saves: {
                        select: {
                            userName: true,
                        },
                    },
                },
            });
            if (!photo) {
                return {
                    ok: false,
                    error: "Photo not found",
                };
            }
            console.log(photo);
            await client.photo.update({
                where: {
                    id,
                },
                data: {
                    saves: {
                        disconnect: photo.saves,
                        connectOrCreate: {
                            where: { userName: loggedInUser.username },
                            create: { userName: loggedInUser.username },
                        },
                    },
                },
            });

            /*  const saveWhere = {
                photoId_userId: {
                    userId: loggedInUser.id,
                    photoId: id,
                },
            };
            const save = await client.save.findUnique({
                where: saveWhere,
            });
            if (save) {
                await client.save.delete({
                    where: saveWhere,
                });
            } else {
                await client.save.create({
                    data: {
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        photo: {
                            connect: {
                                id: photo.id,
                            },
                        },
                    },
                });
            } */
            return {
                ok: true,
            };
        }),
    },
};
