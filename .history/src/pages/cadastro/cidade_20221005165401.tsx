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


export default function CadastrarCidade({id, descricao}, {cidade}) {
    const [notify, setnotify] = useState({isOpen: false, message: '', type:''
})
    const [form, setForm] = useState<DataForm>({nomeCidade: '', urlBrasao: ''})
    const router = useRouter();

    async function criar(data: DataForm){
        console.log(data);
        try{
            fetch('http://localhost:3000/api/cidades/create/criarCidade',{
                body: JSON.stringify(data),
    
                headers : {
                    'Content-type' : 'application/json'
                },
                method: 'POST'
            })
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


    // const handleSubmit = async (data: DataForm) => {
    //     try {
    //         criar(data)
    //     }catch (error){
    //         console.log(error);
    //     }
    // }

    function resetform(form: DataForm){
        window.location.pathname
        
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
                                    
                                }}>
                                    <div className='cardCidade'>
                                        <div>
                                            <div className='f1'>
                                                <TextField
                                                    type="text"
                                                    name="nomeCidade"
                                                    label="Nome da cidade"
                                                    onChange={e => setForm({...form, nomeCidade : e.target.value})}
                                                    placeholder="exemplo: Astorga"
                                                    required 
                                                    fullWidth
                                                />
                                            </div>
                                            <div className='f1'>
                                                <TextField
                                                    name="urlBrasao"
                                                    label="URL do bras??o"
                                                    onChange={e => setForm({...form, urlBrasao: e.target.value})}
                                                    placeholder="URL do Bras??o"
                                                    required
                                                    fullWidth
                                                />
                                            </div>
                                            <div className='f12'>
                                                    <Button id='botaolimpar' size="large" type='reset' variant="outlined">LImpar</Button>
                                                    <Button onClick={e => resetform(form)} id='botao' size='large' variant="contained" type="submit">Adicionar +</Button>
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
            nome: 'asc',
        }
    })
    return {
        props: {
            cidade,
        }
    }
}