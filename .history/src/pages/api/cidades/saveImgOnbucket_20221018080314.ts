import { NextApiRequest, NextApiResponse } from "next";

export default async function getServerSideProps (req: NextApiRequest, res: NextApiResponse){
    const {img} = req.body;
    let Minio = require('minio')

    let minioClient = new Minio.Client({
        endPoint: process.env.ORACLE_ENDPOINT,
        port: 9000,
        useSSL: true,
        accessKey: process.env.ACCESS_KEY,
        secretKey: process.env.BUCKET_UPLOAD_SECRET
    });

}