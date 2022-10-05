import { Button } from "@mui/material";
import Link from "next/link";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { PrismaClient } from "@prisma/client";


export default function CardListagem({descricao, destino, cidade},){

    const editar = async() =>{ 
        console.log('Editar');
        return{
            
        }
    }
    interface idCidade {
        idCidade : Number
    }

    const deletarCidade = async () =>{
        console.log(cidade.idkey);
        try{
            fetch('http://localhost:3000/api/deletarCidade',{
                body: JSON.stringify(cidade.idkey),
    
                headers : {
                    'Content-type' : 'application/json'
                },
                method: 'DELETE'
            })
        }catch (error){
            console.log(error);
        }

        return true;
    }


    return(
        <Link href={destino}>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{descricao}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={editar}><EditIcon/></Button>
                    <Button onClick={deletarCidade}><DeleteForeverIcon/></Button>
                </div>
        </div>
        </Link>
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
