import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import Card from '../../components/home/Card';
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

export default function CadastrarCidade({ cidade }) {

    return (
        <>
            <NavBar></NavBar>
                <div className='titulo'>
                    <h1>Cadastro de cidade</h1>
                </div>
                <div>
                            <div className=''>
                                <form onSubmit={null} method='post'>
                                    <div className='cardCidade'>
                                        <div className=''>
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
                                                    label="URL do Bras??o"
                                                    variant="outlined"
                                                    placeholder="URL do Bras??o"
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
                            <h1>Editar Cidades</h1>
                        </div>
                        <div className='cardCidade'>
                        {
                            cidade.map(cidade => {
                                return (
                                    <Card descricao={cidade.nome} destino={`cidade/${cidade.idkey}`} />
                                )
                            })
                        }
                        </div>
        </>
    )

} 