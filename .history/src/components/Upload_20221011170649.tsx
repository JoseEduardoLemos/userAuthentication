
export default function Upload() {
    return(
            <div>
                <div className="containerUpload">
                    <input className="localDoArquivo"
                        accept=".pdf"
                        type='file'
                        
                        draggable ={true}  
                    />
                </div>
            </div>
    )
}   