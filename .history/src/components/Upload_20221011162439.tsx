import Dropzone from 'dropzone';

export default function Upload() {
    return(
        <>
            <Dropzone accept='' onDropAccepted={() => {}}>
                {
                    ({ getRootProps, getInputsProps, isDragActive, isDragReject})=>
                    <Elemento/>
                }
            </  Dropzone>
        </>
    )
}