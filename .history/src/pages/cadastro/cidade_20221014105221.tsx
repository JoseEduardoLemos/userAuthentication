import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import axios from 'axios';
import { useRouter } from "next/router";
import { useState } from "react";
import CardListagemCidade from "../../components/CardListagemCidade";
import NavBar from "../../components/NavBar";

interface DataForm{
    nomeCidade : String,
    urlBrasao : String,
    imagem : FormData,
}


export default function CadastrarCidade({cidade}) {

    const [form, setForm] = useState<DataForm>({nomeCidade: '', urlBrasao: '', imagem : null});
    const [openSuccess, setOpenSucces] = useState(false);

    const [documento, setDocumento] = useState(null);


    const router = useRouter();


    const submitForm = (data) =>{
        let formData = new FormData();
        let file = document.querySelector('#file');
        formData.append("file", documento);
        axios
        .post('http://localhost:3000/api/planos', formData,{
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
        .then((res) =>{
            alert("Arquivo Salvo!")
        })
        .catch((err) => alert('Erro ao Salvar arquivo.'))
    };
    
    
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
                setOpenSucces(true);
                setForm(
                    { nomeCidade: '', urlBrasao: '', imagem:null}
                )
            router.replace(router.asPath)
            })
        }catch (error){
            console.log(error);
        }
    }

    const clearForms =(data : DataForm) =>{
        setForm({nomeCidade : '', urlBrasao : '', imagem:null})
    }

    const closeSucess = () =>{
        setOpenSucces(false);
    }



    return (
        <>
            <NavBar></NavBar>
                <div className='titulo'>
                    <h1>Cadastro de nova cidade</h1>
                </div>
                <div>
                            <div>
                                <form action="" onSubmit={(e) =>{
                                    e.preventDefault()
                                    submitForm(form)
                                }}>
                                    <input type="file" accept=".pdf"
                                        onChange={(e) => setDocumento(e.target.files[0])}
                                    />
                                    <text>Insira uma imagem</text>
                                    <button type='submit'>SALVAR</button>
                                </form>






                                

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
                                            </div>
                                            {/* <div className='f1'>
                                                <TextField
                                                    value={form.urlBrasao}
                                                    name="urlBrasao"
                                                    label="URL do brasão"
                                                    onChange={e => setForm({...form, urlBrasao: e.target.value})}
                                                    placeholder="URL do Brasão"
                                                    required
                                                    fullWidth
                                                />
                                            </div> */}
                                            <div className='f12'>
                                                    <Button id="botaolimpar"
                                                    variant="outlined"
                                                    size="large"
                                                    type="reset"
                                                    onClick={() => {
                                                        clearForms(form);
                                                    }}>Limpar
                                                    </Button>
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
                                    <CardListagemCidade id ={cidade.idkey} descricao={`${cidade.nome}`}
                                    cidade={cidade} plano={cidade.plano} grupo={cidade.planos.grupos}/>
                                )
                            })
                        }
                        </div>
                        <div>
                        <Snackbar open={openSuccess} autoHideDuration={6000} onClose={closeSucess}>
                        <Alert onClose={closeSucess} severity="success" sx={{ width: '100%' }}>
                            Cidade criada com Sucesso!
                        </Alert>
                        </Snackbar>
                        </div>
        </>
    )

} 

export async function getServerSideProps() {
    const prisma = new PrismaClient(); 

    const cidade = await prisma.cidade.findMany({
        include :{
            planos :{
                include : {
                    grupos : {
                        include : {
                            links : true,
                        }
                    }
                }
            }
        },
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