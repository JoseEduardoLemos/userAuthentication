import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function criarDocumento(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const nomeDoGrupo = req.body;
    try{
        await prisma.grupo.create({
            data: {
                descricao : nomeDoGrupo,
            }
            
        })

    }
    
    catch(error){
        console.log("Falha.")
    }
    return{

    }
}