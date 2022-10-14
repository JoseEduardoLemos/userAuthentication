import axios from 'axios';
import { NextApiRequest, NextApiResponse } from "next";

export default async function criarCidade(req: NextApiRequest, res: NextApiResponse){

    const {nomeCidade, urlBrasao} = req.body;
    axios.get('https://crudcrud.com/api/0abd13e605db493b82e1d77d5afb83e8',{

        headers: {

        },
    }

    )
}