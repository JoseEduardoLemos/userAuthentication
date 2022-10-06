import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CardListagemPlano from "../../components/CardListagemPlano";
import NavBar from "../../components/NavBar";


interface DataForm{
    descricao : String
}

    async function submitPlano (data : DataForm){
    const prisma = new PrismaClient();
    await prisma.plano.create({
        data :{
            descricao : 'Terra boa',
            url_imagem_plano : null,
        }
    })
}


export default function CadastrarPlano({plano}){

    const [form, setForm] = useState<DataForm>({descricao : ''})
    const router = useRouter();
    

    return(
        <>
        <NavBar></NavBar>
            <div className='titulo'>
                <h1>Cadastro de novo Plano</h1>
            </div>
            <div>
                        <div>
                            <form onSubmit= {e =>{ 
                                e.preventDefault()
                                submitPlano(form)}>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                name="nomePlano"
                                                fullWidth
                                                label="Nome do Plano"
                                                variant="outlined"
                                                placeholder="exemplo: Plano de Arborização"
                                                required
                                            />
                                        </div>
                                        <div className='f12'>
                                                <Button id='botaolimpar' size="large" type='reset' variant="outlined">LImpar</Button>
                                                <Button id='botao' size='large' variant="contained" type="submit">Salvar</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='titulo'>
                        <h1>Editar Planos cadastrados</h1>
                    </div>
                    <div className='cardCidade'>
                    {
                        plano.map(plano => {
                            return (
                                <CardListagemPlano id={plano.idkey} descricao={plano.descricao} nomeCidade={plano}/>
                            )
                        })
                    }
                    </div>
    </>
    )

}


export async function getServerSideProps(){
    const prisma = new PrismaClient();  
    const plano = await prisma.plano.findMany({
        include:{
            cidade: {
                select :{
                    nome : true,
                }
            }
        }
    })

    return{
        props:{
            plano,
        }
    }
}