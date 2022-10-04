import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import CardListagem from "../../components/CardListagem";
import NavBar from "../../components/NavBar";

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const grupo = await prisma.grupo.findMany({
        orderBy: {
            descricao : 'asc',
        }
    })
    return {
        props: {
            grupo,
        }
    }
}

 const submitCidade = async (event) =>{
    const prisma = new PrismaClient();
    const grupo = await prisma.grupo.create({
        data :{
            descricao ; 'Grupo de testes',
        }
    })
}


export default function CadastrarCidade({grupo}){
    return(
        <>
        <NavBar></NavBar>
            <div className='titulo'>
                <h1>Cadastro de nova cidade</h1>
            </div>
            <div>
                        <div>
                            <form onSubmit= {submitCidade}>
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