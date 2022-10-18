import multer from 'multer';
import multerMinIOStorage from "multer-minio-storage";
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';


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

const apiRoute = nextConnect({
    onError(error : any, req : NextApiRequest, res : NextApiResponse) {
      res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
    },
    onNoMatch(req : NextApiRequest, res : NextApiResponse) {
      res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
  });
  
  apiRoute.use(upload.array('theFiles'));
  
  apiRoute.post((req, res) => {
    res.status(200).json({ data: 'success' });
  });
  
  export default apiRoute;