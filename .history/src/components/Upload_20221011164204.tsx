import Dropzone from 'dropzone';
import { DropContainer } from './DropContainer';


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
                            Arraste arquivos aqui.
                            
                    </DropContainer>
                )}
            </  Dropzone>
        </>
    )
}