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
                    <div className="iconesEditarExcluir">
                        <Link href='/'><Button><EditIcon/></Button></Link>
                        <Button><DeleteForeverIcon/></Button>
                        
                    </div>
                    
                </div>
            
        </div>
        </Link>
    )
}