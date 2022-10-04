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
    const plano = await prisma.plano.create({
        data :{
            descricao : 'Terra boa',
            url_imagem_plano : null,
        }
    })
}


export default function CadastrarCidade({plano}){
    return(
        <>
        <NavBar></NavBar>
            <div className='titulo'>
                <h1>Cadastro de novo Plano</h1>
            </div>
            <div>
                        <div>
                            <form onSubmit= {submitCidade}>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                id="inserirTexto"
                                                name="nomePlano"
                                                fullWidth
                                                label="Nome do Plano"
                                                variant="outlined"
                                                placeholder="exemplo: Plano de Arborização"
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
                        <h1>Editar Planos cadastrados</h1>
                    </div>
                    <div className='cardCidade'>
                    {
                        plano.map(plano => {
                            return (
                                <CardListagem descricao={plano.descricao} destino={`plano/${plano.idkey}`} />
                            )
                        })
                    }
                    </div>
    </>
    )

}