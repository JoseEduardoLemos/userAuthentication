import { NextApiRequest, NextApiResponse } from "next";

export default async function getServerSideProps(req : NextApiRequest, res : NextApiResponse){
    let Minio = require('minio')
    console.log(process.env.ORACLE_ENDPOINT)

    let minioClient = new Minio.Client({
        endPoint: process.env.ORACLE_ENDPOINT,
        //port: process.env.PORT,
        useSSL: true,
        accessKey: process.env.ACCESS_KEY,
        secretKey: process.env.BUCKET_UPLOAD_SECRET,
        pathStyle : true
    })
    const {imagem} = req.body;

    let Fs = require('fs')
    let file = imagem
    let fileStream = Fs.createReadStream(file)
    let fileStat = Fs.stat(file, function(err, stats) {
    if (err) {
        console.log(process.env.BUCKET_NAME)
        return console.log(err)
    }
    console.log(process.env.BUCKET_NAME)
    minioClient.putObject(process.env.BUCKET_NAME, imagem, fileStream, stats.size, function(err, objInfo) {
        if(err) {
            return console.log(err) // err should be null
        }
    console.log("Success", objInfo)
    })
    })
}
