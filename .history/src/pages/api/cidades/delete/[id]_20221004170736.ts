import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function deletarCidade(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const cidadeId = req.query.id

        console.log('DELETEEEEEEEEE')
        const cidade = await prisma.cidade.delete({
            where :{
                idkey : Number(idCidade),
            }
        })
        res.json(cidade)


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