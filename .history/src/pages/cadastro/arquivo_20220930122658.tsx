import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import CardListagem from "../../components/CardListagem";
import NavBar from "../../components/NavBar";

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const link = await prisma.link.findMany({
        orderBy: {
            descricao : 'asc',
        }
    })
    return {
        props: {
            link,
        }
    }
}

 const submitCidade = async (event) =>{
    const prisma = new PrismaClient();
    const link = await prisma.link.create({
        data :{
            descricao : 'Documento Padrão',
            link : 'https://google.com',
            nomeArquivo : 'Documento Padrão',
            mime : 'pdf',
        }
    })
}


export default function CadastrarCidade({link}){
    return(
        <>
        <NavBar></NavBar>
            <div className='titulo'>
                <h1>Cadastro de novo link</h1>
            </div>
            <div>
                        <div>
                            <form onSubmit= {submitCidade}>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                id="inserirTexto"
                                                name="nomeLink"
                                                fullWidth
                                                label="Descrição do Documento"
                                                variant="outlined"
                                                placeholder="exemplo: Documento Padrão"
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
                        <h1>Editar Grupos cadastrados</h1>
                    </div>
                    <div className='cardCidade'>
                    {
                        grupo.map(grupo => {
                            return (
                                <CardListagem descricao={grupo.descricao} destino={`grupo/${grupo.idkey}`} />
                            )
                        })
                    }
                    </div>
    </>
    )

}