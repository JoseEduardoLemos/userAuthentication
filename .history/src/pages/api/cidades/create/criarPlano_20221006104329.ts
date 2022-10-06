import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function criarPlano(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {descricao} = req.body;
    try{
        await prisma.plano.create({
            data: {
                descricao : descricao,
                url_imagem_plano : 'teste'
            }
            
        })

    }
    
    catch(error){
        console.log("Falha.")
    }
    return{

    }
}