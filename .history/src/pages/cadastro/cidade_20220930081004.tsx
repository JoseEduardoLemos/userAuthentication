import { Button, Card, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import NavBar from "../../components/NavBar";
import '../../styles/cidade.module.css';

async function createCidade(){
    const prisma = new PrismaClient();
    await prisma.cidade.create({
        data: {
            idkey : 4,
            nome : 'Terra Boa',
            urlbrasao : 'urlbrasao : parametro.target.urlBrasao.value',
        }
    })
   const teste = await prisma.cidade.findMany({
    orderBy : {
        nome : 'asc',
    }
   })
    return{
        props:{
            cidade,
        }
    }
}

export default function CadastrarCidade({teste}){
   
    return(
        <>
            <NavBar></NavBar>
            <div className="BodyCadastroCidade">
            <h1>Cadastro de cidade</h1>
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
                                {
                                    teste.map(cidade =>{
                                        return (
                                            <Card descricao={teste.nome} destino={`cidade/${cidade.idkey}`} />
                                        )
                                    })
                                }
                                <div className='f1'>
                                    <TextField 
                                        id="urlBrasao" 
                                        name="urlBrasao"
                                        fullWidth
                                        label="URL do Bras??o" 
                                        variant="outlined" 
                                        placeholder="URL do Bras??o"
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