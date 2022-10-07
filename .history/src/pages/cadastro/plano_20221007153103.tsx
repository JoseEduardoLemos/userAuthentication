import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CardListagemPlano from "../../components/CardListagemPlano";
import NavBar from "../../components/NavBar";


interface DataForm{
    descricao : String
    cidadePertencente : String
    cidadeSelecionada : String
}


export default function CadastrarPlano({plano,cidade}){

    const [form, setForm] = useState<DataForm>({descricao : '', cidadePertencente: '', cidadeSelecionada : ''})
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


    async function clearForms(data : DataForm){
        setForm({cidadePertencente : '', descricao:'', cidadeSelecionada: ''})
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
                                clearForms(form)
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
                                            <FormControl sx={{m : 0, minWidth: 220}}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Cidade Pertencente *</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        id="demo-simple-select-autowidth"
                                                        value={form.cidadePertencente}
                                                        onChange={e=> setForm({...form, cidadePertencente : e.target.value})}
                                                        autoWidth
                                                        label="Cidade Pertencente *"
                                                        required ={true}
                                                    >
                                                {                                               
                                                    cidade.map(cidade =>{
                                                        return(
                                                        <MenuItem value={cidade.idkey}>{`${cidade.nome}`}</MenuItem>
                                                    )})                                                
                                                }    
                                                </Select>
                                            </FormControl>
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
                        <h1>Editar documentos cadastrados</h1>
                        <div className="filtros">
                            <h3>Filtre por cidade</h3>
                            <div>
                            <FormControl sx={{m : 0, minWidth: 220}}>
                                <InputLabel id="demo-simple-select-autowidth-label">Cidade:</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={cidade.nome}
                                    onChange={e=> setForm({...form, cidadeSelecionada : e.target.value})}
                                    autoWidth
                                    label="Cidade:"
                                    required
                                >
                                <MenuItem value={cidade.idkey}>{`Nenhum`}</MenuItem>
                                    {
                                        cidade.map(cidade =>{
                                            return(
                                                <MenuItem value={cidade.idkey}>{cidade.nome}</MenuItem>
                                            )
                                        })
                                    }   

                                </Select>
                            </FormControl>
                            </div>
                        </div>
                    </div>
                    <div className='cardCidade'>
                    {
                        plano.map(function(plano){
                            if(form.cidadeSelecionada == plano.idkey_cidade){
                                return(
                                    <CardListagemPlano id={plano.idkey} descricao={`ID: ${plano.idkey}) ${plano.cidade.nome} - *${plano.descricao}*`} nomeCidade={plano.nome}/>
                                )
                            }
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
            cidade :{
                select : {
                    nome : true,
                }
            },
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