import { Input } from "@mui/material";

export default function Upload() {
    return(
        <Input className="localDoArquivo"
            type='file'
            draggable ={true}  
        />
    )
}   