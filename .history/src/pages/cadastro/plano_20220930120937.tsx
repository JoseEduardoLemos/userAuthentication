import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import CardListagem from "../../components/CardListagem";
import NavBar from "../../components/NavBar";

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const plano = await prisma.plano.findMany({
        orderBy: {
            descricao : 'asc',
        }
    })
    return {
        props: {
            plano,
        }
    }
}

 const submitCidade = async (event) =>{
    const prisma = new PrismaClient();
    const cidade = await prisma.cidade.create({
        data :{
            idkey : 3,
            nome : 'Terra boa',
            urlbrasao : 'https://terraboa.pr.gov.br/wp-content/uploads/2022/06/brasao.png',
        }
    })
}


export default function CadastrarCidade(plano){
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
                        <h1>Editar cidades cadastradas</h1>
                    </div>
                    <div className='cardCidade'>
                    {
                        plano.map(plano => {
                            return (
                                <CardListagem descricao={plano.nome} destino={`plano/${plano.idkey}`} />
                            )
                        })
                    }
                    </div>
    </>
    )

}