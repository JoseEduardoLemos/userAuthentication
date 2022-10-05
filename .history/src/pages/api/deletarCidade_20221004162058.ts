import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function deletarCidade(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {idCidade} = req.body;
    console.log(`DELETAR CIDADE COM ID = ${idCidade}`)
    try{
        await prisma.cidade.delete({
            where:{
                idkey : Number(idCidade),
            }            
        })

    }
    
    catch(error){
        console.log("Falha ao deletar cidade.")
    }
    return{

    }
}