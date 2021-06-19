import AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

export const uploadPhoto = async (file, userId) => {
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${userId}-${Date.now()}-${filename}`;
    const upload = await new AWS.S3()
        .upload({
            Bucket: "instaclone-uploads2",
            Key: objectName,
            ACL: "public-read",
            Body: readStream,
        })
        .promise();
    return "";
};
