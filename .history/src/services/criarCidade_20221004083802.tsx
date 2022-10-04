import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function criarCidade(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {nomeCidade, urlBrasao} = req.body;

    try{
        await prisma.cidade.create({
            data: {
                nome : nomeCidade,
                urlbrasao : urlBrasao,
            }
        })
    }
    catch(error){

    }

    return{

    }
}