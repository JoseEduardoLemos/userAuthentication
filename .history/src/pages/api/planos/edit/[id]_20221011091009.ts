import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

}

export default async function definePlano(req: NextApiRequest, res: NextApiResponse){
    const prisma = new PrismaClient();
    const {descricao, cidadePertencente} = req.body;
    try{
        const plano = await prisma
    }
    const cidade = await prisma.cidade.findMany();
    const plano = await prisma.plano.findMany();

    return{
        props: {
            cidade,
            plano,
        }
    }
}