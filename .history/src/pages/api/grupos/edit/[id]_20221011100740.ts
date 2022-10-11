import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function editaGrupo(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {descricao, cidadePertencente, planoPertencente} = req.body;
    const idkey = req.body.id;
    try{
        const grupo = await prisma.grupo.update({
            where : {
                idkey : Number(idkey),
            },
            data :{
                descricao : descricao, 
                idkey_plano : planoPertencente,
            }

        })
        return{
            props:{
                grupo,
            }
        }
    }
    catch(error){
        console.log(error)
    }
}