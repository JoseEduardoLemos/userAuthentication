import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CardListagemPlano from "../../components/CardListagemPlano";
import NavBar from "../../components/NavBar";


interface DataForm{
    descricao : String
}


export default function CadastrarPlano({plano}){

    const [form, setForm] = useState<DataForm>({descricao : ''})
    const router = useRouter();
    
    async function submitPlano (data : DataForm){
        console.log(data)
        try{
            fetch('http://localhost:3000/api/planos/create/criarPlano',{
                body: JSON.stringify(data),

                headers:{
                    'Content-type' : 'application/json'
                },
                method:'POST'
            })
            router.replace(router.asPath)
            .then(() => {
                router.replace(router.asPath)
                
            })
        }catch (error){
            console.log(error);
        }
    }


    return(
        <>
        <NavBar></NavBar>
            <div className='titulo'>
                <h1>Cadastro de novo Plano</h1>
            </div>
            <div>
                        <div>
                            <form onSubmit= {e =>{ 
                                e.preventDefault()
                                submitPlano(form)
                            }}>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                name="descricao"
                                                fullWidth
                                                label="Nome do Plano"
                                                onChange={e=> setForm({...form, descricao: e.target.value})}
                                                variant="outlined"
                                                placeholder="exemplo: Plano de Arboriza????o"
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
                                <CardListagemPlano id={plano.idkey} descricao={plano.descricao} nomeCidade={plano}/>
                            )
                        })
                    }
                    </div>
    </>
    )

}


export async function getServerSideProps(Router){
const idRota = Router.query;
const prisma = new PrismaClient();  

const plan = await prisma.plano.findFirst({
    where :{
        idkey : Number(idRota),
    }
})


    
    const plano = await prisma.plano.findMany({
        include:{
            cidade: {
                select :{
                    nome : true,
                }
            }
        }
    })

    return{
        props:{
            plano,
        }
    }
}