import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CardListagemGrupo from "../../components/CardListagemGrupo";
import NavBar from "../../components/NavBar";


interface DataForm{
    descricaoGrupo : String
    planoPertencente : String
    cidadePertencente : String
    cidadeSelecionada : String
    planoSelecionado : String
    isDisable : boolean
    isDisable2 : boolean
}


export default function CadastrarCidade({grupo,cidade, plano}){
    
    const router = useRouter();
    const [form, setForm] = useState<DataForm>({descricaoGrupo: '', planoPertencente: '',
     cidadePertencente: null, isDisable: true, cidadeSelecionada : '', planoSelecionado : '',
    isDisable2: true});

    const cidadeSelecionada = Number(form.cidadePertencente);
    const planoSelecionado = Number(form.planoPertencente);

    async function submitForm(data : DataForm){
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
                    {descricaoGrupo : '', planoPertencente: '', cidadePertencente: null,
                    isDisable:true, cidadeSelecionada : '', planoSelecionado:'',
                    isDisable2: true}
                )
            router.replace(router.asPath)
            })
        }catch(error){
            console.log(error);
        }
    }

    async function clearForms(data : DataForm){
        setForm({descricaoGrupo : '', planoPertencente: '', cidadePertencente: null,
        isDisable:true, cidadeSelecionada :'', planoSelecionado: '',
        isDisable2: true})
    }

    const result = async function defineCidade( data: DataForm){
        try{
            fetch ('http://localhost:3000/api/cidades/defineCidade',{
                body : JSON.stringify(data.cidadePertencente),

                method : 'GET'
            })
        }catch(error){
            console.log(error);
        }
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
                                        <div className="formGrande">
                                            <div id='campo2'>
                                                <FormControl sx={{m : 0, minWidth: 220}}>
                                                    <InputLabel id="demo-simple-select-autowidth-label">Cidade pertencente *</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-autowidth-label"
                                                            id="demo-simple-select-autowidth"
                                                            value={form.cidadePertencente}
                                                            onChange={e=> setForm({...form, cidadePertencente : e.target.value, isDisable : false})}
                                                            autoWidth
                                                            label="Cidade pertencente *"
                                                            required
                                                        >
                                                    {                  
                                                        cidade.map(cidade => {
                                                            return(
                                                                <MenuItem value={cidade.idkey}>{cidade.nome}</MenuItem>
                                                            )
                                                        })                                                                                        
                                                    }    
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div id='campo2'>
                                                <FormControl sx={{m : 0, minWidth: 220}}>
                                                    <InputLabel id="demo-simple-select-autowidth-label">Plano pertencente *</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-autowidth-label"
                                                            id="demo-simple-select-autowidth"
                                                            value={form.planoPertencente}
                                                            onChange={e=> setForm({...form, planoPertencente : e.target.value})}
                                                            autoWidth
                                                            label="Plano pertencente *"
                                                            required
                                                            disabled={form.isDisable}
                                                        >
                                                            
                                                            {
                                                                plano.map(function(plano){
                                                                    if(plano.idkey_cidade == cidadeSelecionada){
                                                                        return(
                                                                            <MenuItem value={plano.idkey}>{`${plano.descricao}`}</MenuItem>
                                                                        )
                                                                    }
                                                                })                                                         
                                                            }  
                                                    </Select>
                                                </FormControl>
                                            </div>
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
                        <h1>Editar grupos cadastrados</h1>
                        <h3>Busque especificamente</h3>
                        <div className="filtros">
                                <div id='filtro'>
                                <FormControl sx={{m : 0, minWidth: 220}}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Cidade:</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={cidade.nome}
                                        onChange={e=> setForm({...form, cidadeSelecionada : e.target.value, isDisable2 : false})}
                                        autoWidth
                                        label="Cidade:"
                                        required
                                    >
                                    <MenuItem value={0}>{`Nenhum`}</MenuItem>
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
                                <div id='filtro'>
                                <FormControl sx={{m : 0, minWidth: 220}}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Plano:</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={cidade.nome}
                                        onChange={e=> setForm({...form, planoSelecionado : e.target.value})}
                                        autoWidth
                                        label="Plano:"
                                        required
                                        disabled = {form.isDisable2}
                                    >
                                        {
                                            cidadeSelecionada === 0?
                                            form.isDisable2 = true
                                        }
                                    <MenuItem value={0}>{`Nenhum`}</MenuItem>
                                        {
                                            plano.map(function(plano){
                                                if(cidadeSelecionada == plano.idkey_cidade){
                                                    return(
                                                        <MenuItem value={plano.idkey}>{plano.descricao}</MenuItem>
                                                    )
                                                }
                                            })
                                        }   

                                    </Select>
                                </FormControl>
                                </div>
                            </div>
                        </div> 
                    <div className='cardCidade'>
                    
                    {    
                        grupo.map(function(grupo){
                            if(form.cidadeSelecionada == grupo.plano.cidade.idkey && form.planoSelecionado == grupo.idkey_plano)
                            {
                                return(
                                    <CardListagemGrupo id={grupo.idkey} descricao={`ID: ${grupo.idkey}) ${grupo.descricao} ${grupo.plano.cidade.nome}`}/>
                                )
                            }
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
        
    const cidade = await prisma.cidade.findMany({
        include:{
            planos : {
                select :{
                    idkey :true,
                    descricao : true,
                    url_imagem_plano : true,
                }
            }
        }
    });
    const plano = await prisma.plano.findMany();

    return {
        props: {
            grupo,
            plano,
            cidade,
        }
    }
}