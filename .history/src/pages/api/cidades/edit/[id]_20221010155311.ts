import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {nomeCidade, urlBrasao} = req.body;
    const cidadeId = req.body.id;
    try{
        await prisma.cidade.update({
            where :{
                idkey : 1,
                
            },
            data :{
                nome : 'nomeCidade',
                urlbrasao : 'urlBrasao',
            }
         })
    }
    catch(error){
        console.log(error)
    }
    return{
        
    }
}