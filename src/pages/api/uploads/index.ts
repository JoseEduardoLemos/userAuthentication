import { NextApiRequest, NextApiResponse } from "next";


export default async function criarCidade(req: NextApiRequest, res: NextApiResponse){
    try{
        const file = req.body;
    }
    
    catch(error){
        console.log(error)
    }
    return{

    }
}