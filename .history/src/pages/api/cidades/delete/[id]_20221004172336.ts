import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse, Router){
    const prisma = new PrismaClient();   
    const cidadeId = Router.query();

    console.log(JSON.stringify(cidadeId))

        if(req.method === 'DELETE'){
        const cidade = await prisma.cidade.delete({
            where :{
                idkey : 10,
            }
        })

        res.json(cidade)
        }
        else {
            console.log('nao foi possivel deletar esta cidade');
        }
}