import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {nomeCidade, urlBrasao} = req.body;
    const cidadeId = req.body.id;
    try{
        if(req.method === 'UPDATE'){
        await prisma.cidade.update({
            where :{
                idkey : Number(cidadeId),
            },
            data :{
                nome : nomeCidade,
                urlbrasao : urlBrasao,
            }
         })
         
        }
    }
    catch(error){
        console.log(error)
    }
    return{
        
    }
}