import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function deletarCidade(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {idCidade} = req.body;
    try{
        await prisma.cidade.delete({
            where:{

            }
            }
            
        })

    }
    
    catch(error){
        console.log("Falha.")
    }
    return{

    }
}