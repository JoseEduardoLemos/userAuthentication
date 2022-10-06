import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();   
    const documentoId = req.query.id
    
        if(req.method === 'DELETE'){
        const cidade = await prisma.link.delete({
            where :{
                idkey : Number(documentoId),
            }
        })

        res.json(cidade)
        }
        else {
            console.log('nao foi possivel deletar este documento');
        }
}