import { Button } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/router";
import { useState } from "react";
import CardEditarPlano from "./plano/CardEditarPlano";
import CardExcluirPlano from "./plano/CardExcluirPlano";



interface crud {
    editar : boolean
    excluir : boolean
}

export default function CardListagemPlano( {id, descricao, plano, cidade}){
    const [crud, setCrud] = useState<crud>({editar : false, excluir: false})
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const editar = async() =>{ 
        console.log('Editar');
        return{
            
        }
    }

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
                        <CardEditarPlano plano={plano} cidade={cidade}/>
                    </div>   
                )
            }
        </div>
        <div>
            {
                crud.excluir &&(
                    <div>
                        <CardExcluirPlano cidade={plano.cidade} plano={plano}/>
                    </div>
                )
            }
        </div>
        </>
    )
}