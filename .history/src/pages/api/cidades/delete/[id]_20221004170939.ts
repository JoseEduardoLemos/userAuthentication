import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function deletarCidade(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const cidadeId = req.query.idkey

        console.log('DELETEEEEEEEEE')
        if(req.method === 'DELETE'){
        const cidade = await prisma.cidade.delete({
            where :{
                idkey : Number(cidadeId),
            }
        })

        res.json(cidade)
        }
        else {
            console.log('nao foi possivel deletar esta cidade');
        }

    console.log(`DELETAR CIDADE COM ID = ${cidadeId}`)
    try{
        await prisma.cidade.delete({
            where:{
                idkey : Number(cidadeId),
            }            
        })

    }
    
    catch(error){
        console.log("Falha ao deletar cidade.")
    }
    return{

    }
}