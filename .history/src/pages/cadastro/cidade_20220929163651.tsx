import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import NavBar from "../../components/NavBar";



export async function CadastrarCidade({cidades}){
    const prisma = new PrismaClient();
    function createCidade({}){
        return{

        }
    }

    return(
        <>
            <NavBar></NavBar>
            <h1>Cadastro </h1>
            <div>
                <div>
                    <form onSubmit={null} method='post'>
                        <div className='corpoformulario'>
                            <h1 id='h12index'>Login</h1>
                                <div className='f1'>
                                    <TextField 
                                        id="fullwidth campo" 
                                        fullWidth
                                        label="Endereço de email" 
                                        variant="outlined" 
                                        placeholder="Seu email"
                                        autoComplete= "email"
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