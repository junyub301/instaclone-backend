import { protectedResolver } from "../../../users/users.utils";
import client from "../../../client";
import { processHashtags } from "../editPhoto/photos.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, { file, caption }, { loggedInUser }) => {
                let hashtagObj = [];
                if (caption) {
                    // parse caption
                    hashtagObj = processHashtags(caption);
                }
                // get or create Hashtags
                return client.photo.create({
                    data: {
                        file,
                        caption,
                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },
                        ...(hashtagObj.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObj,
                            },
                        }),
                    },
                });
                // save the pohoto With the pasred hashtags
                // add the photo to the hashtags
            }
        ),
    },
};
