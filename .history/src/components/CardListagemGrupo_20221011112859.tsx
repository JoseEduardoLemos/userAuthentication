import { Button } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import CardEditarGrupo from "./grupo/CardEditarGrupo";
import CardExclusaoGrupo from "./grupo/CardExcluirGrupo";


interface crud {
    editar : boolean
    deletar : boolean
}


export default function CardListagemGrupo({id, descricao, cidade, plano, grupo}){
  
    const [crud, setCrud] = useState<crud>({editar : false, deletar : false});
    
    const clickDelete = () =>{
        setCrud({deletar : true, editar : false})
    }

    const clickEdit = () =>{
        setCrud({deletar : false, editar : true});
    }

    return(
        <>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{`ID: ${id}) ${descricao}`}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={clickEdit}><EditIcon/></Button>
                    <Button onClick={clickDelete}><DeleteForeverIcon/></Button>
                </div>
        </div>
        
        <div>
            {   crud.editar &&(
                    <div>
                            <CardEditarGrupo cidade={cidade} plano={plano} grupo={grupo}/>
                    </div>
            )
            }
            <div>
            </div>
        </div>
        <div>
            {   crud.deletar &&(
                    <div>
                        <CardExclusaoGrupo id={id} descricao={descricao}></CardExclusaoGrupo>
                    </div>
                )
            }
        </div>


        </>
    )
}

