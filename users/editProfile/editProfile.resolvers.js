import bcrypt from "bcrypt";
import client from "../../client";
import { uploadToS3 } from "../../shared/shared.utils";
import { protectedResolver } from "../users.utils";

export default {
    Mutation: {
        editProfile: protectedResolver(
            async (
                _,
                {
                    firstName,
                    lastName,
                    username,
                    email,
                    password: newPassword,
                    bio,
                    avatar,
                },
                { loggedInUser }
            ) => {
                let avatarUrl = null;
                if (avatar) {
                    avatarUrl = await uploadToS3(
                        avatar,
                        loggedInUser.id,
                        "avatars"
                    );
                    /* 서버에 파일 저장
                    const { filename, createReadStream } = await avatar;
                    const newFilename = `${
                        loggedInUser.id
                    }-${Date.now()}-${filename}`;
                    const readStream = createReadStream();
                    const writeStream = createWriteStream(
                        process.cwd() + "/uploads/" + newFilename
                    );
                    readStream.pipe(writeStream);
                    avatarUrl = `http://localhost:4000/static/${newFilename}`; 
                    */
                }
                let uglyPassword = null;
                if (newPassword) {
                    uglyPassword = await bcrypt.hash(newPassword, 10);
                }
                const updateUser = await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        bio,
                        ...(uglyPassword && { password: uglyPassword }),
                        ...(avatarUrl && { avatar: avatarUrl }),
                    },
                });
                if (updateUser.id) {
                    return {
                        ok: true,
                    };
                } else {
                    return {
                        ok: false,
                        error: "Could not update profile.",
                    };
                }
            }
        ),
    },
};
