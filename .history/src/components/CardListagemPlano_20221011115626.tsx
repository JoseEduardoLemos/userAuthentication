import { Button } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import CardEditarPlano from "./plano/CardEditarPlano";
import CardExcluirPlano from "./plano/CardExcluirPlano";



interface crud {
    editar : boolean
    excluir : boolean
}

export default function CardListagemPlano( {plano, cidade}){
    const [crud, setCrud] = useState<crud>({editar : false, excluir: false})
    
    const clickDelete = () =>{
        setCrud({editar: false, excluir: true});
    }

    const clickEdit = () =>{
        setCrud({editar : true, excluir : false})
    }

    return(
        <>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{`ID: ${plano.idkey}) ${plano.descricao}`}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={clickEdit}><EditIcon/></Button>
                    <Button onClick={clickDelete}><DeleteForeverIcon/></Button>
                </div>
        </div>
        <div>
            {
                crud.editar &&(
                    <div>
                        <CardEditarPlano plano={plano} cidade={cidade}/>
                    </div>   
                )
            }
        </div>
        <div>
            {
                crud.excluir &&(
                    <div>
                        <CardExcluirPlano plano={plano}/>
                    </div>
                )
            }
        </div>
        </>
    )
}