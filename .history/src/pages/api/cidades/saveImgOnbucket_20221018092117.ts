import { NextApiRequest, NextApiResponse } from "next"

export default async function getServerSideProps(req : NextApiRequest, res : NextApiResponse){

    let Minio = require('minio')
    let minioClient = new Minio.Client({
        endPoint: process.env.ORACLE_ENDPOINT,
        port: process.env.PORT,
        useSSL: true,
        accessKey: process.env.ACCESS_KEY,
        secretKey: process.env.BUCKET_UPLOAD_SECRET
    })
}