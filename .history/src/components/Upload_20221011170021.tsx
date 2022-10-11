
export default function Upload() {
    return(
            <div>
                <div className="containerUpload">
                    <input className="localDoArquivo"
                        accept=".pdf"
                        type='file'
                        draggable
                    />
                    Clique para carregar um arquivo <br></br>
                            ou arraste e solte aqui
                </div>
            </div>
    )
}   