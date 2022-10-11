import Dropzone from 'dropzone';

export default function Upload() {
    return(
        <>
            <Dropzone accept='.pdf' onDropAccepted={() => {}}>
                {
                    ({ getRootProps, getInputsProps, isDragActive, isDragReject})=>
                    <Elemento/>
                }
            </  Dropzone>
        </>
    )
}