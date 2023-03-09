'use strict';

const AWS = require('aws-sdk');
const S3 = new AWS.S3();

exports.handler = async (event) => {
    
    let name = event.Records[0].s3.object.key;
    let size = event.Records[0].s3.object.size;
    let type = 'jpg';
    let newImageObj = { name, size, type }
    console.log('newImageObj', newImageObj);
    
    let images = [];
    
    let params = {
        Bucket:'john-chavez-bucket',
        Key:'images.json'
    }
    try {
        let data = await S3.getObject(params).promise();
        console.log('data', data);
        images = JSON.parse(data.Body.toString());
        console.log('images', images);
    }catch(e){
        console.log(e.message);
    }
    
    images.push(newImageObj);
    params.Body = JSON.stringify(images);
    
    try{
        await S3.putObject(params).promise();
        console.log('')
    }catch(e){
        console.log(e.message);
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(images),
    };
    return response;
};

