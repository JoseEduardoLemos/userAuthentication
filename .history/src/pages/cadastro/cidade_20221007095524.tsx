import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CardListagemCidade from "../../components/CardListagemCidade";
import NavBar from "../../components/NavBar";
import '../../styles/cidade.module.css';



interface DataForm{
    nomeCidade : String,
    urlBrasao : String,
}


export default function CadastrarCidade({cidade}) {
    const [notify, setnotify] = useState({isOpen: false, message: '', type:''
})
    const [form, setForm] = useState<DataForm>({nomeCidade: '', urlBrasao: ''})

    const router = useRouter();

    async function criar(data: DataForm){
        try{
            fetch('http://localhost:3000/api/cidades/create/criarCidade',{
                body: JSON.stringify(data),
    
                headers : {
                    'Content-type' : 'application/json'
                },
                method: 'POST'
            })
            router.replace(router.asPath)
            .then(() => {
                setForm(
                    { nomeCidade: '', urlBrasao: '' }
                )
            router.replace(router.asPath)
            })
        }catch (error){
            console.log(error);
        }
    }


    async function clearForms(data : DataForm){
        setForm({nomeCidade : '', urlBrasao : ''})
    }

    return (
        <>
            <NavBar></NavBar>
                <div className='titulo'>
                    <h1>Cadastro de nova cidade</h1>
                </div>
                <div>
                            <div>
                                <form onSubmit = {e =>{
                                    e.preventDefault()
                                    criar(form)
                                    clearForms(form)
                                }}>
                                    <div className='cardCidade'>
                                        <div>
                                            <div className='f1'>
                                                <TextField
                                                    id='nomeCidade'
                                                    value={form.nomeCidade}
                                                    name="nomeCidade"
                                                    label="Nome da cidade"
                                                    onChange={e => setForm({...form, nomeCidade : e.target?.value})}
                                                    placeholder="exemplo: Astorga"
                                                    required 
                                                    fullWidth
                                                />
                                            </div>
                                            <div className='f1'>
                                                <TextField
                                                    value={form.urlBrasao}
                                                    name="urlBrasao"
                                                    label="URL do brasão"
                                                    onChange={e => setForm({...form, urlBrasao: e.target.value})}
                                                    placeholder="URL do Brasão"
                                                    required
                                                    fullWidth
                                                />
                                            </div>
                                            <div className='f12'>
                                                    <Button id='botaolimpar' size="large" type='reset' variant="outlined">LImpar</Button>
                                                    <Button id='botao' size='large' variant="contained" type="submit">Adicionar +</Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className='titulo'>
                            <h1>Editar cidades cadastradas</h1>
                        </div>
                        <div className='cardCidade'>
                        {
                            cidade.map(cidade => {
                                return (
                                    <CardListagemCidade id ={cidade.idkey} descricao={`ID: ${cidade.idkey}) ${cidade.nome}`}/>
                                )
                            })
                        }
                        </div>
        </>
    )

} 

export async function getServerSideProps() {
    const prisma = new PrismaClient(); 

    const cidade = await prisma.cidade.findMany({
        orderBy: {
            idkey: 'asc',
        }
    })

    return {
        props: {
            cidade,
        }
    }
}