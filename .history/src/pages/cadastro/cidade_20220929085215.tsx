import { PrismaClient } from "@prisma/client";
import NavBar from "../../components/NavBar";



export default function CadastrarCidade({cidades}){
    return(
        <>
            <NavBar></NavBar>
            <h1>Cadastro de Cidade</h1>
            <h2></h2>
        </>
    )

}

export async function getServerSideProps(){
    const prisma = new PrismaClient();
    const cidades = await prisma.cidade.findMany();
    return{
        props:{
            cidades,
        }
    }
}