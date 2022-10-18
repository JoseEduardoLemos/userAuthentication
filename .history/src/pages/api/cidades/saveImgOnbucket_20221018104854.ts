import multer from 'multer';
import multerMinIOStorage from "multer-minio-storage";


let Minio = require('minio')

let minioClient = new Minio.Client({
    endPoint: process.env.ORACLE_ENDPOINT,
    //port: process.env.PORT,
    useSSL: true,
    accessKey: process.env.ACCESS_KEY,
    secretKey: process.env.BUCKET_UPLOAD_SECRET,
    pathStyle : true,
    region : process.env.REGION
})

const upload = multer({
    storage: multerMinIOStorage({
        minioClient: minioClient,
        bucket: process.env.BUCKET_NAME,
        metadata: function (req, file, cb) {
          cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
          cb(null, Date.now().toString())
        }
      })
});
