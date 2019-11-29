const im = require('imagemagick');
const fs = require('fs');
const os = require('os');
const uuidv4 = require('uuid/v4');
const {promisify} = require('util');
const AWS = require('aws-sdk');

const resizeAsync = promisify(im.resize);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

AWS.config.update({region: 'cn-northwest-1'});
const s3 = new AWS.S3();

exports.handler = async (event) => {
  let filesProcessed = event.Records.map(async (record) => {
    let bucket = record.s3.bucket.name;
    let filename = record.s3.object.key;

    // Get file from S3
    let params = {
      Bucket: bucket,
      Key: filename
    };
    console.log('load img file start');
    console.log(params);
    let inputData = await s3.getObject(params).promise();
    console.log('load img file finish');
    // Resize the file
    let tempFile = os.tmpdir() + '/' + uuidv4() + '.jpg';
    let resizeArgs = {
      srcData: inputData.Body,
      dstPath: tempFile,
      width: 150
    };
    await resizeAsync(resizeArgs);

    // Read the resized file
    let resizedData = await readFileAsync(tempFile);

    // Upload the new file to s3
    let targetFilename = filename.substring(0, filename.lastIndexOf('.')) + '-small.jpg';
    params = {
      Bucket: bucket + '-dest',
      Key: targetFilename,
      Body: new Buffer(resizedData),
      ContentType: 'image/jpeg'
    };

    console.log('save img file start');
    await s3.putObject(params).promise();
    console.log('save img file finish');
    return await unlinkAsync(tempFile);
  });

  await Promise.all(filesProcessed);
  console.log("done");
  return "done";
};
// aws2 s3 cp 33-resizeImage.js.zip s3://demo-images/resize-images.js.zip
// aws2 lambda update-function-code --function-name resizeImages --s3-bucket demo-images --s3-key resize-images.js.zip --publish
