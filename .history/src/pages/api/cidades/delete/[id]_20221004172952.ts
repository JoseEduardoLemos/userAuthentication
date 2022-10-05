import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();   
    const cidadeId = req.query
    
        if(req.method === 'DELETE'){
        const cidade = await prisma.cidade.delete({
            where :{
                idkey : Number(cidadeId),
            }
        })

        res.json(cidade)
        }
        else {
            console.log('nao foi possivel deletar esta cidade');
        }
}