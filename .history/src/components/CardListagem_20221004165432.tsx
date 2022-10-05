import { Button } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";


export default function CardListagem({idCidade, descricao}){
    const router = useRouter();
    const editar = async() =>{ 
        console.log('Editar');
        return{
            
        }
    }
    interface idCidade {
        idCidade : Number
    }

    async function deletarCidade (){
        console.log('deletar cidade', idCidade)
        try{
            fetch('http://localhost:3000/api/deletarCidade',{   
                headers : {
                    'Content-type' : 'application/json'
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
