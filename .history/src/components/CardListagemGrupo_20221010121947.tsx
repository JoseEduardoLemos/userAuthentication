import { Button } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/router";
import { useState } from "react";
import CardEditarGrupo from "./grupo/CardEditarGrupo";
import CardExclusaoGrupo from "./grupo/CardExclusaoGrupo";





export default function CardListagemGrupo({id, descricao}){
  
    const [editar, setEditar] = useState(false);
    const [deletar, setDeletar] = useState(false);

    const clickDelete = () =>{
        setDeletar(true);
    }

    const clickEdit = () =>{
        setEditar(true);
    }

    async function deletarGrupo (){
        const router = useRouter();
        try{
            fetch(`http://localhost:3000/api/grupos/delete/${id}`,{   
                headers : {
                    'Content-type' : 'application/json',
                },
                method: 'DELETE'
            })
            .then(() => {
                router.replace(router.asPath)
            })
        }catch (error){
            console.log(error);
        }
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
                    <CardEditarGrupo id={id} descricao={descricao}></CardEditarGrupo>
                </div>
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

