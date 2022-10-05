import { Button } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";


export default function CardListagem({idCidade, descricao, destino}){
    const router = useRouter();
    const editar = async() =>{ 
        console.log('Editar');
        return{
            
        }
    }
    interface idCidade {
        idCidade : Number
    }

    const deletarCidade = async () =>{
        console.log('ef,leoferff');
        try{
            fetch('http://localhost:3000/api/deletarCidade',{
                body: idCidade,
    
                headers : {
                    'Content-type' : 'application/json'
                },
                method: 'DELETE'
            })
        }catch (error){
            console.log(error);
        }
        router.replace(router.asPath)
        return true;
    }


    return(
        <>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{descricao}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={editar}><EditIcon/></Button>
                    <Button onClick={deletarCidade}><DeleteForeverIcon/></Button>
                </div>
        </div>
        </>
    )
}


export async function getServerSideProps(Router){
    const idRota = Router.query();
    
    const prisma = new PrismaClient();

    const cidade = await prisma.cidade.findFirst({
        where: {
            idkey : idRota,
        }
    })
    return{
        props:{
            cidade,
        }
    }
}
