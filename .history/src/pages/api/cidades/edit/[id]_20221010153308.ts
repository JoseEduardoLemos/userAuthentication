import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {nomeCidade, urlBrasao, Cidadeidkey} = req.body;
    try{
        await prisma.cidade.update({
            where :{
                idkey : Cidadeidkey,
            },
            data :{
                nome : nomeCidade,
                urlbrasao : urlBrasao,
            }
         })
    }
    catch(error){
        console.log(error)
    }
    return{

    }
}