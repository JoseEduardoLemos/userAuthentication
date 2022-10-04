import { TextField } from "@mui/material";
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
            descricao : 'Grupo de testes',
        }
    })
}


export default function CadastrarCidade({grupo}){
    return(
        <>
        <NavBar></NavBar>
            <div className='titulo'>
                <h1>Cadastro de novo Grupo</h1>
            </div>
            <div>
                        <div>
                            <form onSubmit= {submitCidade}>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                id="inserirTexto"
                                                name="nomeGrupo"
                                                fullWidth
                                                label="Nome do Grupo"
                                                variant="outlined"
                                                placeholder="exemplo: Documentos Iniciais"
                                                required
                                            />
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
                    <CardListagem descricao={grupo.descricao} destino={`grupo/${grupo.idkey}`} />
                    {/* {
                        grupo.map(grupo => {
                            return (
                                <CardListagem descricao={grupo.descricao} destino={`grupo/${grupo.idkey}`} />
                            )
                        })
                    } */}
                    </div>
    </>
    )

}