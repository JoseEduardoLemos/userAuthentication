import { Button } from "@mui/material";
import Link from "next/link";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

export default function CardListagem({descricao, destino}){

    const editar = async() =>{ 
        return{
            
        }
    }

    const excluir = async() =>{
        return{

        }
    }





    return(
        <Link href={destino}>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{descricao}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={editar}><EditIcon/></Button>
                    <Button onClick={excluir}><DeleteForeverIcon/></Button>
                </div>
        </div>
        </Link>
    )
}