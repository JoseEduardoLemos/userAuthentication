import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function criarPlano(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {descricao} = req.body;
    try{
        await prisma.plano.create({
            data: {
                descricao : descricao,
                url_imagem_plano : ''
            }
            
        })

    }
    
    catch(error){
        console.log("Não foi possível criar esta cidade")
    }
    return{

    }
}