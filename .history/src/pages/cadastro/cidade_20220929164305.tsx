import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import NavBar from "../../components/NavBar";



export default function CadastrarCidade({cidades}){
   
    async function createCidade(data){
        const prisma = new PrismaClient();
        const cidade = await prisma.cidade.create({
            data:{
                nome : `${data.}`
            }
        })


        return{
            

        }
    }

    return(
        <>
            <NavBar></NavBar>
            <h1>Cadastro </h1>
            <div>
                <div>
                    <form onSubmit={createCidade} method='post'>
                        <div className='corpoformulario'>
                                <div className='f1'>
                                    <TextField 
                                        id="fullwidth campo" 
                                        fullWidth
                                        label="Nome da cidade" 
                                        variant="outlined" 
                                        placeholder="Nome da Cidade"
                                        required
                                    />
                                </div>

                                <div className='f1'>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="Senha" 
                                        variant="outlined" 
                                        placeholder="Sua senha"
                                        autoComplete= "senha"
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