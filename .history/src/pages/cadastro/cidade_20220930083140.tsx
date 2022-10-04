import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import Card from '../../components/Card';
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
            <div className="BodyCadastroCidade">
                <div className='containerTituloHome'>
                    <h1>Cadastro de cidade</h1>
                </div>
                <div>
                    <div className ='containerPrincipalHome'>
                        <div className='containerTituloHome'>
                        {
                            cidade.map(cidade => {
                                return (
                                    <Card descricao={cidade.nome} destino={`cidade/${cidade.idkey}`} />
                                )
                            })
                        }
                        </div>
                        <div className='containerTituloHome'>
                            <div className=''>
                                <form onSubmit={null} method='post'>
                                    <div className=''>
                                        <div className='f1'>
                                            <TextField
                                                id="fullwidth"
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
                                                id="urlBrasao"
                                                name="urlBrasao"
                                                fullWidth
                                                label="URL do Brasão"
                                                variant="outlined"
                                                placeholder="URL do Brasão"
                                                required
                                            />
                                        </div>
                                        <div className='f1'>
                                            <Button id='botao' size='large' variant="contained" type="submit">Entrar</Button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

} 