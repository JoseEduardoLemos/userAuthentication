import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import NavBar from "../../components/NavBar";
import '../../styles/cidade.module.css';

export default function CadastrarCidade({cidades}){
   
    async function createCidade(parametro){
        const prisma = new PrismaClient();
        const cidade = await prisma.cidade.create({
            data: {
                nome : parametro.target.nomeCidade.value,
                urlbrasao : parametro.target.urlBrasao.value,
            }
        })


        return{
            props : {
                cidade,
            }

        }
    }

    return(
        <>
            <NavBar></NavBar>
            <div className="BodyCadastroCidade">
            <h1>Cadastro </h1>
            <div>
                <div>
                    <form onSubmit={createCidade} method='post'>
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
        </>
    )

}

export async function getServerSideProps(){
    const prisma = new PrismaClient();
    const cidades = await prisma.cidade.findMany();
    return{
        props:{
            cidades,
        }
    }
}