import { Button } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CardCidade from "../../components/CardListagem";
import NavBar from "../../components/NavBar";
import '../../styles/cidade.module.css';


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


interface FormData{
    nomeCidade : String
    urlBrasao : String
}


export default function CadastrarCidade({cidade}) {

    const [form, setForm] = useState<FormData>({nomeCidade: '', urlBrasao: ''})

    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath)
    }

    async function criar(data: FormData){
        console.log(data);
        try{
            fetch('http://localhost:3000/api/criarCidade',{
                body: JSON.stringify(data),
    
                headers : {
                    'Content-type' : 'application/json'
                },
                method: 'POST'
            }).then(() => setForm({ nomeCidade: '', urlBrasao: ''}))
        }catch (error){
            console.log(error);
        }
    }


    const handleSubmit = async (data: FormData) => {
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
                                }}>
                                    <div className='cardCidade'>
                                        <div>
                                            <div className='f1'>
                                                <input
                                                    id="inserirTexto"
                                                    name="nomeCidade"
                                                    placeholder="exemplo: Astorga"
                                                    required 
                                                    minLength={1}
                                                />
                                            </div>
                                            <div className='f1'>
                                                <input
                                                    id="inserirTexto"
                                                    name="urlBrasao"
                                                    placeholder="URL do Bras??o"
                                                    required
                                                    minLength={1}
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
                            <h1>Editar cidades cadastradas</h1>
                        </div>
                        <div className='cardCidade'>
                        {
                            cidade.map(cidade => {
                                return (
                                    <CardCidade descricao={cidade.nome} destino={`cidade/${cidade.idkey}`} />
                                )
                            })
                        }
                        </div>
        </>
    )

} 