import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function criarPlano(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {descricao, cidadePertencente} = req.body;
    try{
        await prisma.plano.create({
            data: {
                descricao : descricao,
                idkey_cidade : Number(cidadePertencente),
                url_imagem_plano : ''
            }
            
        })

    }
    
    catch(error){
        console.log("Não foi possível criar este plano")
    }
    return{

    }
}