import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from "next/router";


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    console.log('entrou na edicao de cidade')
    const prisma = new PrismaClient();  
    const router = useRouter(); 
    const cidadeId = router.query;
    const {nomeCidade, urlBrasao} = req.body;
    try{
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
    catch(error){
        console.log("Não foi possível alterar esta cidade")
    }
    return{

    }
}