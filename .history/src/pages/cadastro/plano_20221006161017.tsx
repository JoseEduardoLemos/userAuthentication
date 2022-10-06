import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CardListagemPlano from "../../components/CardListagemPlano";
import NavBar from "../../components/NavBar";


interface DataForm{
    descricao : String
    cidadePertencente : number
}


export default function CadastrarPlano({plano,cidade}){

    const [form, setForm] = useState<DataForm>({descricao : '', cidadePertencente: null})
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
                                    <div className='cardSeparador'>
                                        <div className='f1'>
                                            <TextField
                                                name="descricao"
                                                fullWidth
                                                value={form.descricao}
                                                label="Nome do Plano"
                                                onChange={e=> setForm({...form, descricao: e.target.value})}
                                                variant="outlined"
                                                placeholder="exemplo: Plano de Arborização"
                                                required
                                            />
                                        </div>
                                        <div id='campo2'>
                                                <InputLabel sx={{minWidth: 0 }} id="demo-simple-select-autowidth-label">Cidade</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        id="demo-simple-select-autowidth"
                                                        value={cidade.nome}
                                                        autoWidth
                                                        label="Cidade"
                                                    >
                                                <MenuItem value="Cidade">
                                                    <em>Nenhuma</em>
                                                </MenuItem>
                                                {                                               
                                                    cidade.map(cidade =>{
                                                        return(
                                                        <MenuItem value={cidade.nome}>{`${cidade.nome}`}</MenuItem>
                                                    )})                                                
                                                }    
                                                </Select>
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


export async function getServerSideProps(){
const prisma = new PrismaClient();  
    const plano = await prisma.plano.findMany({
        include:{
            cidade: {
                select :{
                    nome : true,
                }
            }
        }
    })
const cidade = await prisma.cidade.findMany();

    return{
        props:{
            plano,
            cidade,
        }
    }
}