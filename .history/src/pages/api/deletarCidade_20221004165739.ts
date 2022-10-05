import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function deletarCidade(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const idCidade = req.body.idey;

    if(req.method === 'DELETE') {
        console.log('DELETEEEEEEEEE')
        const cidade = await prisma.cidade.delete({
            where :{
                idkey : Number(idCidade),
            }
        })
        res.json(cidade)
    }
    else {
        console.log("Cidade nao pode ser deletada!");
    }


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