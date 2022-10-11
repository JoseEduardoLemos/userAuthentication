import Dropzone from 'react-dropzone';

export default function Upload() {
    return(
        <>
            <Dropzone accept="image/*" onDropAccepted={() => {}}>
                {
                    ({ getRootProps, getInputsProps, isDragActive, isDragReject})=>
                    <Elemento/>
                }
            </  Dropzone>
        </>
    )
}