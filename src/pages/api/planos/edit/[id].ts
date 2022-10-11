import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function definePlano(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {descricao, cidadePertencente, idkey} = req.body;
    try{
        const plano = await prisma.plano.update({
            where : {
                idkey : Number(idkey),
            },
            data :{
                descricao : descricao,
                idkey_cidade : Number(cidadePertencente),
                url_imagem_plano :'', 
            }
        })
        return{
            props:{
                plano,
            }
        }
    }
    catch(error){
        console.log(error)
    }
}