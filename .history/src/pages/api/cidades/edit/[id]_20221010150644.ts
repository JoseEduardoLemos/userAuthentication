import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();  
    const router = useRouter(); 
    const {nomeCidade, urlBrasao} = req.body;
    
        if(req.method === 'PUT'){
        const cidade = await prisma.cidade.update({
            where :{
                idkey : Number(cidadeId),
            },
            data :{

            }

        res.json(cidade)
        }
        else {
            console.log('nao foi possivel deletar esta cidade');
        }
}