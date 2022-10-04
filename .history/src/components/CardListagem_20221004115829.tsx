import { Button } from "@mui/material";
import Link from "next/link";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export default function CardListagem({descricao, destino}){
    return(
        <Link href={destino}>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{descricao}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Link href='http://localhost:3000/cadastro/cidade'><Button><EditIcon/></Button></Link>
                    <Link href='http://localhost:3000/cadastro/cidade'><Button><DeleteForeverIcon/></Button></Link>
                </div>
            
        </div>
        </Link>
    )
}