import { Button } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CardCidade from "../../components/CardListagem";
import NavBar from "../../components/NavBar";
import '../../styles/cidade.module.css';




interface DataForm{
    nomeCidade : String,
    urlBrasao : String,
}


export default function CadastrarCidade({cidade}) {

    const [form, setForm] = useState<DataForm>({nomeCidade: '', urlBrasao: ''})
    const router = useRouter();

    const refreshData = () => {
        router.replace(router.asPath)
    }

    async function criar(data: DataForm){
        console.log(data);
        try{
            fetch('http://localhost:3000/api/criarCidade',{
                body: JSON.stringify(data),
    
                headers : {
                    'Content-type' : 'application/json'
                },
                method: 'POST'
            }).then(() => {
                setForm({ nomeCidade: '', urlBrasao: ''}))
                refreshData();
        }catch (error){
            console.log(error);
        }
        refreshData();
    }


    const handleSubmit = async (data: DataForm) => {
        try {
            criar(data)
        }catch (error){
            console.log(error);
        }
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
                                    handleSubmit(form)
                                    location.reload();
                                }}>
                                    <div className='cardCidade'>
                                        <div>
                                            <div className='f1'>
                                                <input
                                                    id="inserirTexto"
                                                    type="text"
                                                    name="nomeCidade"
                                                    onChange={e => setForm({...form, nomeCidade : e.target.value})}
                                                    placeholder="exemplo: Astorga"
                                                    required 
                                                    minLength={1}
                                                />
                                            </div>
                                            <div className='f1'>
                                                <input
                                                    id="inserirTexto"
                                                    name="urlBrasao"
                                                    onChange={e => setForm({...form, urlBrasao: e.target.value})}
                                                    placeholder="URL do Brasão"
                                                    required
                                                    minLength={1}
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
                                    <CardCidade descricao={`ID: ${cidade.idkey}) ${cidade.nome}`} destino={`cidade/${cidade.idkey}`} />
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
            nome: 'asc',
        }
    })
    return {
        props: {
            cidade,
        }
    }
}