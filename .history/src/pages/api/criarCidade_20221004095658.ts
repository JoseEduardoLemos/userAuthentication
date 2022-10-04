import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function criarCidade(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {nomeCidade, urlBrasao} = req.body;
    console.log(nomeCidade, urlBrasao);
    try{
        await prisma.cidade.create({
            data: {
                nome : nomeCidade,
                urlbrasao : urlBrasao,
            }
        })
        res.status(200).json({message: 'NÃO Criado.'})
    }
    catch(error){
        console.log("Falha.")
    }

    return{

    }
}