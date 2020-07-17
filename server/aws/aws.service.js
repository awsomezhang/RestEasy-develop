var aws = require('aws-sdk');
const config = require('../config.json');
const { json } = require('body-parser');
var getUser = require("../users/user.service")

module.exports = {
    signS3
};

// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: 'us-east-1', // Put your aws region here
  accessKeyId: config.AWSAccessKeyId,
  secretAccessKey: config.AWSSecretKey
})


async function signS3(req) {

    // express-jwt appends sub (the user index in mongo) into req. use sub to get user details from mongo
    const userInfo = await getUser.getById(req.user.sub)
    console.log(userInfo)


    const s3 = new aws.S3();  // Create a new instance of S3
    console.log("-----s3 created-----")

    const S3_BUCKET = req.body.bucket;
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;

    // sending to the S3
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: userInfo._id+"/"+fileName,
        Expires: 500,
        ContentType: fileType,
    };

    console.log(s3Params)

    // Get a signed URL to upload file
    var signedRequest = s3.getSignedUrl('putObject', s3Params)

    const returnData = {
        signedRequest: signedRequest,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };

    return returnData;
}