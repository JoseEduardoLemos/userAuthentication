import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from 'react';
import CardListagem from "../../components/CardListagemCidade";
import NavBar from "../../components/NavBar";



interface DataForm{
    descricaoDocumento : String
    link : String
}


export default function CadastrarCidade({link}){
    const [form, setForm] = useState({descricaoDocumento: '', link: ''})
    const router = useRouter();


    async function submitForm(data : DataForm){
        try{
            fetch('http://localhost:3000/api/documentos/create/criarDocumento',{
                body: JSON.stringify(data),

                headers:{
                    'Content-type' : 'application/json'
                },
                method: 'POST'
            })
            router.replace(router.asPath)
            .then(() => {
                setForm({descricaoDocumento: '', link: ''})
            router.replace(router.asPath)
            })

        }catch(error){
            console.log(error);
        }
    }



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
                                submitForm(form)
                            }}>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                name="descricaoDocumento"
                                                value={form.descricaoDocumento}
                                                fullWidth
                                                onChange={e => setForm({...form, descricaoDocumento : e.target?.value})}label="Descrição do Documento"
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
                                                onChange={e => setForm({...form, link : e.target?.value})}
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
                                <CardListagem descricao={`ID: ${link.idkey}) ${link.descricao}`} id={link.idkey}/>
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
            idkey : 'asc',
        }
    })
    return {
        props: {
            link,
        }
    }
}