import { Button } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/router";
import { useState } from "react";
import CardEditarCidade from "./cidade/CardEditarCidade";
import CardExcluirCidade from "./cidade/CardExcluirCidade";


interface crud {
    editar : boolean
    excluir : boolean
}

export default function CardListagemCidade({id, descricao, cidade, plano, grupo}){
    const [crud, setCrud] = useState<crud>({editar: false, excluir:false});
    const router = useRouter();

    const clickDelete = () =>{
        setCrud({editar : false, excluir : true});
    }

    const clickEdit = () =>{
        setCrud({editar : true, excluir: false});
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
            {
                crud.editar &&(
                    <div>
                        <CardEditarCidade cidade={cidade} plano={plano} grupo={grupo}/>
                    </div>
                )
            }
        </div>
        {
            setCrud
        }
        <div>
            {
                crud.excluir &&(
                    <div>
                        <CardExcluirCidade id={id} descricao={descricao}/>
                    </div>
                )
            }
        </div>
        </>
    )
}
