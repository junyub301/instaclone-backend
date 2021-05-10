import AWS from "aws-sdk";

AWS.config.update({
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
    },
});

export const uploadPhoto = async (file, userId) => {
    const { filename, createReadStream } = await file;
    const readStream = createReadStream();
    const objectName = `${userId}-${Date.now()}-${filename}`;
    console.log(userId);
    const upload = await new AWS.S3()
        .upload({
            Bucket: "instaclone-uploads2",
            Key: objectName,
            ACL: "public-read",
            Body: readStream,
        })
        .promise();
    console.log(upload);
    return "";
};
