import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import CardCidade from "../../components/cidade/CardCidade";
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

 const submiteform = async (event) =>{
    const teste = [];

    for (let i = 0; i<event.lenght; i++){
        teste[i] = event;
    }

    const prisma = new PrismaClient();
    await prisma.cidade.create({
        data :{
            idkey : 1,
            nome : 'teste.nome',
            urlbrasao : '1',
        }
    })
}

export default function CadastrarCidade({ cidade }) {

    return (
        <>
            <NavBar></NavBar>
                <div className='titulo'>
                    <h1>Cadastro de nova cidade</h1>
                </div>
                <div>
                            <div>
                                <form onSubmit= {submiteform}>
                                    <div className='cardCidade'>
                                        <div>
                                            <div className='f1'>
                                                <TextField
                                                    id="inserirTexto"
                                                    name="nomeCidade"
                                                    fullWidth
                                                    label="Nome da cidade"
                                                    variant="outlined"
                                                    placeholder="Nome da Cidade"
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
                            <h1>Crie um plano de gestão agora</h1>
                        </div>

                        <div>
                            <div>
                                <form onSubmit= {submiteform}>
                                    <div className='cardCidade'>
                                        <div>
                                            <div className='f1'>
                                                <TextField
                                                    id="inserirTexto"
                                                    name="nomePlano"
                                                    fullWidth
                                                    label="Nome do Plano"
                                                    variant="outlined"
                                                    placeholder="Nome do Plano"
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