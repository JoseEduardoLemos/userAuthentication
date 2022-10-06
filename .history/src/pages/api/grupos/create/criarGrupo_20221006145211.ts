import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function criarDocumento(req: NextApiRequest, res: NextApiResponse){
    console.log(req.body)
    const prisma = new PrismaClient();
    const {nomeDoGrupo} = req.body;
    try{
        await prisma.grupo.create({
            data: {
                descricao : 'fsjfofkesofk',
            }
            
        })

    }
    
    catch(error){
        console.log("Não foi possível criar esta grupo")
    }
    return{

    }
}