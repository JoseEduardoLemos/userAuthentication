import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {nomeCidade, urlBrasao, idkey} = req.body;
    try{
        const cidade = await prisma.cidade.update({
            where :{
                idkey : Number(idkey),
                
            },
            data :{
                nome : nomeCidade,
                urlbrasao : urlBrasao,
            }
         })
         return{
            props:{
                cidade,
            }
         }
    }
    catch(error){
        console.log(error)
    }
}