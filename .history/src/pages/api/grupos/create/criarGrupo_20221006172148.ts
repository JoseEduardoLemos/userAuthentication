import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function criarDocumento(req: NextApiRequest, res: NextApiResponse){
    console.log(req.body)
    const prisma = new PrismaClient();
    const {descricaoGrupo, planoPertencente} = req.body;
    try{
        await prisma.grupo.create({
            data: {
                descricao : descricaoGrupo,
                idkey_plano : Number(planoPertencente),
            }
            
        })

    }
    
    catch(error){
        console.log("Não foi possível criar esta grupo")
    }
    return{

    }
}