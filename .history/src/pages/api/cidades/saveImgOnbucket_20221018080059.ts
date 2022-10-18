import { NextApiRequest, NextApiResponse } from "next";

export default async function getServerSideProps (req: NextApiRequest, res: NextApiResponse){
    const {img} = req.body;
    let Minio = require('minio')

    let minioClient = new Minio.Client({
        endPoint: 'play.min.io',
        port: 9000,
        useSSL: true,
        accessKey: 'Q3AM3UQ867SPQQA43P2F',
        secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
    });

}