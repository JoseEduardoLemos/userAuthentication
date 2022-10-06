import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();   
    const grupoId = req.query.id
    
        if(req.method === 'DELETE'){
        const grupo = await prisma.grupo.delete({
            where :{
                idkey : Number(grupoId),
            }
        })

        res.json(grupo)
        }
        else {
            console.log('nao foi possivel deletar este grupo');
        }
}