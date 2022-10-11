import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function editarDocumento(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {descricao, grupoPertencente, idkey} = req.body;
    try{
        const link = await prisma.link.update({
            where : {
                idkey : Number(idkey),
            },
            data :{
                descricao : descricao,
                idkey_grupo : Number(grupoPertencente),
            }

        })
        return{
            props:{
                link,
            }
        }
    }
    catch(error){
        console.log(error)
    }
}