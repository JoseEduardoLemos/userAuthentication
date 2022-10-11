import { Button } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import CardEditarDocumento from "./documento/CardEditarDocumento";
import CardExcluirDocumento from "./documento/CardExcluirDocumento";



interface crud {
    editar : boolean
    deletar : boolean
}


export default function CardListagemDocumento({link, grupo, plano, cidade}){
    
    const [crud, setCrud] = useState<crud>({deletar : false, editar : false});

    const clickDelete = () =>{
        setCrud({deletar : true, editar : false})
    }

    const clickEdit = () =>{
        setCrud({deletar : false, editar : true})
    }

    return(
        <>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{`ID: ${link.idkey}) ${link.descricao}`}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={clickEdit}><EditIcon/></Button>
                    <Button onClick={clickDelete}><DeleteForeverIcon/></Button>
                </div>
        </div>
        <div>
            {
                crud.editar &&(
                    <CardEditarDocumento cidade={cidade} plano={plano} grupo={grupo} link={link}/>
                )
            }
        </div>

        <div>
            {
                crud.deletar &&(
                    <CardExcluirDocumento id={link.idkey} descricao={link.descricao}/>
                )
            }
        </div>
        </>
    )
}
