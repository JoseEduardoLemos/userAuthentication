import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function defineCidade(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {cidadePertencente} = req.body;
    try{
        const cidade = await prisma.cidade.findFirst({
            where:{
                idkey : Number(cidadePertencente),
            }
            
        })
        
    }
    
    catch(error){
        console.log("Não foi possível criar esta cidade")
    }
    return{
    
    }
}