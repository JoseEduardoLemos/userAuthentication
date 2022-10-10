import { Button } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from "react";
import CardEditarGrupo from "./grupo/CardEditarGrupo";
import CardExclusaoGrupo from "./grupo/CardExclusaoGrupo";
export default function CardListagemGrupo({id, descricao, cidade, plano, grupo}){
  
    const [editar, setEditar] = useState(false);
    const [deletar, setDeletar] = useState(false);

    const clickDelete = () =>{
        setDeletar(true);
    }

    const clickEdit = () =>{
        setEditar(true);
    }


    return(
        <>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{`ID) ${id}) ${descricao}`}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={clickEdit}><EditIcon/></Button>
                    <Button onClick={clickDelete}><DeleteForeverIcon/></Button>
                </div>
        </div>
        
        <div>
            { editar &&(
                <div>
                    <CardEditarGrupo cidade={cidade} plano={plano} grupo={grupo}/>
                </div>,
                setEditar(false)
            ) }
        </div>
        <div>
            {
                deletar &&(
                    <div>
                        <CardExclusaoGrupo id={id} descricao={descricao}></CardExclusaoGrupo>
                    </div>
                )
            }
        </div>


        </>
    )
}

