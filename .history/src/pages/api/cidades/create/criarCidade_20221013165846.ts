import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function criarCidade(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {nomeCidade, urlBrasao, imagem} = req.body;
    try{
        await prisma.cidade.create({
            data: {
                nome : nomeCidade,
                urlbrasao : imagem,
            }
            
        })

    }
    
    catch(error){
        console.log("Não foi possível criar esta cidade")
    }
    return{

    }
}