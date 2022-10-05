import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    console.log('teste')
    const cidadeId = req.query.idkey
    console.log(JSON.stringify(cidadeId))

        console.log('DELETEEEEEEEEE')
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