import bcrypt from "bcrypt";
import client from "../../client";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (_, { username, password }) => {
            // find user with args.username
            const user = await client.user.findFirst({
                where: {
                    username,
                },
            });
            console.log(`user: ${user}`);
            if (!user) {
                return {
                    ok: false,
                    error: "User not found",
                };
            }
            // check password with args.password
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect password.",
                };
            }
            // issue a token and send it to the user
            const token = await jwt.sign(
                { id: user.id },
                process.env.SECRET_KEY
            );
            console.log(token);
            return {
                ok: true,
                token,
            };
        },
    },
};
