
export default async function getServerSideProps(){

    let Minio = require('minio')
    let minioClient = new Minio.Client({
        endPoint: process.env.ORACLE_ENDPOINT,
        port: process.env.PORT,
        useSSL: true,
        accessKey: process.env.ACCESS_KEY,
        secretKey: process.env.BUCKET_UPLOAD_SECRET
    })
}