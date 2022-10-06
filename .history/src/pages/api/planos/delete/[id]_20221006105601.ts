import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();   
    const planoId = req.query.id
    
        if(req.method === 'DELETE'){
        const cidade = await prisma.plano.delete({
            where :{
                idkey : Number(planoId),
            }
        })

        res.json(cidade)
        }
        else {
            console.log('nao foi possivel deletar este plano');
        }
}