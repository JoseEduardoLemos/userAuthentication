import DriveUploady, { useUploady } from "drive-uploady";

const MyButton = () => {
    const { upload } = useUploady();
  
  const onUpload = async () =>  {
  
    const myBlob = await fetch('../../lib/images');
    
    upload(myBlob);
  };

  return <button onClick={onUpload}>Upload</button>
};

const App = () => {

  return <DriveUploady>
            upload
          <MyButton />
        </DriveUploady>
};