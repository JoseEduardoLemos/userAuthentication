import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
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

 export async function submitCidade (){
    console.log('wefnofnowefnongf');
    const prisma = new PrismaClient();
    await prisma.cidade.create({
        data :{
            nome : 'Terra boa',
            urlbrasao : 'https://terraboa.pr.gov.br/wp-content/uploads/2022/06/brasao.png',

        }
    })
}

export default function CadastrarCidade({ cidade, result }) {
    function testando (test) {
        const result = test;
        return(result)
    }
    return (
        <>
            <NavBar></NavBar>
                <div className='titulo'>
                    <h1>Cadastro de nova cidade</h1>
                </div>
                <div>
                            <div>
                                <form onSubmit = {testando}>
                                    <div className='cardCidade'>
                                        <div>
                                            <div className='f1'>
                                                <TextField
                                                    id="inserirTexto"
                                                    name="nomeCidade"
                                                    fullWidth
                                                    label="Nome da cidade"
                                                    variant="outlined"
                                                    placeholder="exemplo: Astorga"
                                                    required 
                                                />
                                            </div>
                                            <div className='f1'>
                                                <TextField
                                                    id="inserirTexto"
                                                    name="urlBrasao"
                                                    fullWidth
                                                    label="URL do Brasão"
                                                    variant="outlined"
                                                    placeholder="URL do Brasão"
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