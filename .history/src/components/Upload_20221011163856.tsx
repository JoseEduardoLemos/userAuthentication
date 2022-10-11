import Dropzone from 'dropzone';


export default function Upload() {
    return(
        <>
            <Dropzone accept='.pdf' onDropAccepted={() => {}}>
                {
                    ({ getRootProps, getInputsProps, isDragActive, isDragReject})=>(
                    <DropContainer
                        { ... getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                        >
                            <input { ... getInputsProps()} />
                    </DropContainer>
                )}
            </  Dropzone>
        </>
    )
}