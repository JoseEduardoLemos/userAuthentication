import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useState } from 'react';
import CardListagem from "../../components/CardListagemCidade";
import NavBar from "../../components/NavBar";


 const submitLink = async (event) =>{
    const prisma = new PrismaClient();
    await prisma.link.create({
        data :{
            descricao : 'Documento Padrão',
            link : 'https://google.com',
            nomeArquivo : 'Documento Padrão',
            mime : 'pdf',
        }
    })
}


export default function CadastrarCidade({link}){
    const [form, setForm] = useState({descricaoDocumento: '', link: ''})

    return(
        <>
        <NavBar></NavBar>
            <div className='titulo'>
                <h1>Cadastro de novo documento</h1>
            </div>
            <div>
                        <div>
                            <form onSubmit= {e=>{
                                e.preventDefault()
                                submitLink(form)
                            }}>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                name="descricaoDocumento"
                                                value={form.descricaoDocumento}
                                                fullWidth
                                                label="Descrição do Documento"
                                                variant="outlined"
                                                placeholder="exemplo: Documento Padrão"
                                                required
                                            />
                                            </div>
                                            <div className='f1'>
                                              <TextField
                                                value={form.link}
                                                name="link"
                                                fullWidth
                                                label="Link do Documento"
                                                variant="outlined"
                                                placeholder="exemplo: <link do drive> <bucket>"
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
                        <h1>Editar documentos cadastrados</h1>
                    </div>
                    <div className='cardCidade'>
                    {
                        link.map(link => {
                            return (
                                <CardListagem descricao={link.descricao}/>
                            )
                        })
                    }
                    </div>
    </>
    )

}

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const link = await prisma.link.findMany({
        orderBy: {
            descricao : 'asc',
        }
    })
    return {
        props: {
            link,
        }
    }
}