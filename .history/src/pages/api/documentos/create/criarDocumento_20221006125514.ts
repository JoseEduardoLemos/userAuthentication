import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function criarDocumento(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {descricaoDocumento, link} = req.body;
    try{
        await prisma.link.create({
            data: {
                descricao : descricaoDocumento,
                link : link,
                mime : 'pdf',
                nomeArquivo : descricaoDocumento,
            }
            
        })

    }
    
    catch(error){
        console.log("Falha.")
    }
    return{

    }
}