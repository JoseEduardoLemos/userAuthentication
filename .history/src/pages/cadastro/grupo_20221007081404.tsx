import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CardListagemGrupo from "../../components/CardListagemGrupo";
import NavBar from "../../components/NavBar";


interface DataForm{
    descricaoGrupo : String
    planoPertencente : String
}


export default function CadastrarCidade({grupo, plano}){



    const router = useRouter();
    const [form, setForm] = useState<DataForm>({descricaoGrupo: '', planoPertencente: ''});

    async function submitForm(data : DataForm){
        console.log(data)
        try{
            fetch('http://localhost:3000/api/grupos/create/criarGrupo',{
                body : JSON.stringify(data),
                
                headers : {
                    'Content-type' : 'application/json'
                },
                method: 'POST'
            })
            router.replace(router.asPath)
            .then(() => {
                setForm(
                    {descricaoGrupo : '', planoPertencente: ''}
                )
            router.replace(router.asPath)
            })
        }catch(error){
            console.log(error);
        }
    }

    async function clearForms(data : DataForm){
        setForm({descricaoGrupo : '', planoPertencente: ''})
    }

    return(
        <>
        <NavBar></NavBar>
            <div className='titulo'>
                <h1>Cadastro de novo Grupo</h1>
            </div>
            <div>
                        <div>
                            <form onSubmit= {e=>{
                                e.preventDefault()
                                submitForm(form)
                                clearForms(form)
                            }}>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                name="descricaoGrupo"
                                                value={form.descricaoGrupo}
                                                onChange = { e=> setForm({...form, descricaoGrupo : e.target?.value})}
                                                fullWidth
                                                label="Nome do Grupo"
                                                variant="outlined"
                                                placeholder="exemplo: Documentos Iniciais"
                                                required
                                            />
                                        </div>
                                        <div id='campo2'>
                                            <FormControl sx={{m : 0, minWidth: 220}}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Plano pertencente</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        id="demo-simple-select-autowidth"
                                                        value={form.planoPertencente}
                                                        onChange={e=> setForm({...form, planoPertencente : e.target.value})}
                                                        autoWidth
                                                        label="Plano pertencente"
                                                        required
                                                    >
                                                <MenuItem value="Plano">
                                                    <em>Nenhum</em>
                                                </MenuItem>
                                                {                                               
                                                    plano.map(plano =>{
                                                        return(
                                                        <MenuItem value={plano.idkey}>{`${plano.descricao} ${grupo.cidade}`}</MenuItem>
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
                        <h1>Editar Grupos cadastrados</h1>
                    </div>
                    <div className='cardCidade'>
                    {
                        grupo.map(grupo => {
                            return (
                                <CardListagemGrupo descricao={`${grupo.descricao} - ${grupo.plano.descricao}`} id={grupo.idkey}/>
                            )
                        })
                    }
                    </div>
    </>
    )

}

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const grupo = await prisma.grupo.findMany({
        orderBy: {
            plano :{
                cidade : {
                    nome : 'asc',
                }
            }   
        },
        include : {
            plano :{
                select : {
                   idkey : true,
                   descricao : true,
                   cidade : true,     
                },
            },
        },
    })
        
    const plano = await prisma.plano.findMany({
        include :{
            cidade : {
                select : {
                    nome : true,
                    idkey : true,
                }
            },
        }
    });

    return {
        props: {
            grupo,
            plano,
        }
    }
}