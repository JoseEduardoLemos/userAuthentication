import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function editarDocumento(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {descricaoGrupo, planoPertencente, idkey} = req.body;
    try{
        const grupo = await prisma.grupo.update({
            where : {
                idkey : Number(idkey),
            },
            data :{
                descricao : descricaoGrupo,
                idkey_plano : Number(planoPertencente),
                idkey : Number(idkey),
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