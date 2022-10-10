import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from 'react';
import NavBar from "../../components/NavBar";



interface DataForm{
    descricaoDocumento : String
    link : String
    grupoPertencente : String
    isDisabled : boolean
    isDisabled2 :boolean
    isDisabled3 : boolean
    isDisabled4 : boolean
    isDisabled5 : boolean
    cidadePertencente : String
    planoPertencente : String
    cidadeSelecionada : String
    planoSelecionado : String
    grupoSelecionado : String
}


export default function CadastrarCidade({link, grupo, plano, cidade}){
    const [form, setForm] = useState({descricaoDocumento: '', link: '', grupoPertencente : '',
    isDisabled : true, cidadePertencente : '', planoPertencente: '', isDisabled2: true,
    cidadeSelecionada : null, planoSelecionado : null, grupoSelecionado : null, isDisabled3 : true })
    const router = useRouter();


    async function submitForm(data : DataForm){
        try{
            fetch('http://localhost:3000/api/documentos/create/criarDocumento',{
                body: JSON.stringify(data),

                headers:{
                    'Content-type' : 'application/json'
                },
                method: 'POST'
            })
            router.replace(router.asPath)
            .then(() => {
                setForm({descricaoDocumento: '', link: '', grupoPertencente:'',
                isDisabled : true, cidadePertencente :'', planoPertencente: '',
                isDisabled2 : true, cidadeSelecionada : null, planoSelecionado : null, grupoSelecionado : null,
                isDisabled3 : true})
            router.replace(router.asPath)
            })

        }catch(error){
            console.log(error);
        }
    }

    return(
        <>
        <NavBar></NavBar>
            <div className='titulo'>
                <h1>Cadastro de novo documento</h1>
            </div>
            <div>
                        <div>
                            <form onSubmit= {e=>{
                                e.preventDefault()
                                submitForm(form)
                            }}>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                name="descricaoDocumento"
                                                value={form.descricaoDocumento}
                                                fullWidth
                                                onChange={e => setForm({...form, descricaoDocumento : e.target?.value})}label="Descrição do Documento"
                                                variant="outlined"
                                                placeholder="exemplo: Documento Padrão"
                                                required
                                            />
                                        </div>
                                        <div className='f1'>
                                              <TextField
                                                value={form.link}
                                                name="link"
                                                fullWidth
                                                onChange={e => setForm({...form, link : e.target?.value})}
                                                label="Link do Documento"
                                                variant="outlined"
                                                placeholder="exemplo: <link do drive> <bucket>"
                                                required
                                            />
                                        </div>
                                        <div className="formGrande">
                                            <div id='campo2'>
                                                <FormControl sx={{m : 0, minWidth: 220}}>
                                                    <InputLabel id="demo-simple-select-autowidth-label">Cidade Pertencente *</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-autowidth-label"
                                                            id="demo-simple-select-autowidth"
                                                            value={form.cidadePertencente}
                                                            onChange={e=> setForm({...form, cidadePertencente : e.target.value, isDisabled : false})}
                                                            autoWidth
                                                            label="Cidade Pertencente *"
                                                            required
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
                                            
                                            <div id='campo2'>
                                            <FormControl sx={{m : 0, minWidth: 220}}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Plano pertencente *</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        id="demo-simple-select-autowidth"
                                                        value={form.planoPertencente}
                                                        onChange={e=> setForm({...form, planoPertencente : e.target.value, isDisabled2 : false})}
                                                        autoWidth
                                                        label="Plano pertencente *"
                                                        required
                                                        disabled={form.isDisabled}
                                                    >
                                                {
                                                    plano.map(function(plano){
                                                        if(plano.idkey_cidade == form.cidadePertencente){
                                                            return(
                                                                <MenuItem value={plano.idkey}>{`${plano.descricao}`}</MenuItem>
                                                            )
                                                        }
                                                    })                                                         
                                                }     
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div id='campo2'>
                                            <FormControl sx={{m : 0, minWidth: 220}}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Grupo pertencente *</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        id="demo-simple-select-autowidth"
                                                        value={form.grupoPertencente}
                                                        onChange={e=> setForm({...form, grupoPertencente : e.target.value})}
                                                        autoWidth
                                                        label="Grupo pertencente *"
                                                        required
                                                        disabled={form.isDisabled2}
                                                    >
                                                {
                                                    grupo.map(function(grupo){
                                                        if(grupo.idkey_plano == form.planoPertencente){
                                                            return(
                                                                <MenuItem value={grupo.idkey}>{`${grupo.descricao}`}</MenuItem>
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
                        <h1>Editar documentos cadastrados</h1>
                        <h3>Busque especificamente</h3>
                        <div className="filtros">
                                <div id='filtro'>
                                <FormControl sx={{m : 0, minWidth: 220}}>
                                    <InputLabel id="demo-simple-select-autowidth-label">Cidade:</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="demo-simple-select-autowidth"
                                        value={cidade.nome}
                                        onChange={e=> setForm({...form, cidadeSelecionada : e.target.value, isDisabled3 : false})}
                                        autoWidth
                                        label="Cidade:"
                                        required
                                    >
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
                                            plano.map(function(plano){
                                                if(form.cidadeSelecionada == plano.idkey_cidade){
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
                                    <CardListagemGrupo id={grupo.idkey} descricao={`${grupo.descricao} ${grupo.plano.cidade.nome}`}/>
                                )
                            }
                        })
                    }
                    </div>
                    
    </>
)}

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const link = await prisma.link.findMany({
        include :{
            grupo :{
                include :{
                    plano : {
                        include : {
                            cidade : true,
                        }
                    }
                }
            }
        },
        orderBy: {
            grupo : {
                plano : {
                    cidade : {
                        nome : 'asc',
                    }
                }
            }
        },
    })
    const grupo = await prisma.grupo.findMany({
        include: {
            plano : {
                include : {
                    cidade : true,
                }
            }
        }
    })
    const plano = await prisma.plano.findMany({
        include : {
            grupos : {
                include :{ 
                    links : true,
                }
            }
        }
    })
    const cidade = await prisma.cidade.findMany({
        include :{
            planos :{
                include :{
                    grupos :{
                        include :{
                            links :true,
                        }
                    }
                }
            }
        }
    })
    return {
        props: {
            link,
            grupo,
            plano,
            cidade,
        }
    }
}