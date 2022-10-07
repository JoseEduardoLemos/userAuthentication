import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from 'react';
import CardListagemDocumento from "../../components/CardListagemDocumento";
import NavBar from "../../components/NavBar";



interface DataForm{
    descricaoDocumento : String
    link : String
    grupoPertencente : String
}


export default function CadastrarCidade({link, grupo}){
    const [form, setForm] = useState({descricaoDocumento: '', link: '', grupoPertencente : ''})
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
                setForm({descricaoDocumento: '', link: '', grupoPertencente:''})
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
                                        <div id='campo2'>
                                            <FormControl sx={{m : 0, minWidth: 220}}>
                                                <InputLabel id="demo-simple-select-autowidth-label">Grupo pertencente</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        id="demo-simple-select-autowidth"
                                                        value={form.grupoPertencente}
                                                        onChange={e=> setForm({...form, grupoPertencente : e.target.value})}
                                                        autoWidth
                                                        label="Grupo pertencente"
                                                        required
                                                    >
                                                <MenuItem value="Grupo">
                                                    <em>Nenhum</em>
                                                </MenuItem>
                                                {                                               
                                                    grupo.map(grupo =>{
                                                        return(
                                                        <MenuItem value={grupo.idkey}>{`${grupo.plano.cidade.nome} / ${grupo.plano.descricao} / ${grupo.descricao}`}</MenuItem>
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
                            <h2>Filtros</h2>
                            <div>
                            <FormControl sx={{m : 0, minWidth: 220}}>
                                <InputLabel id="demo-simple-select-autowidth-label">Grupo pertencente</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={form.grupoPertencente}
                                    onChange={e=> setForm({...form, grupoPertencente : e.target.value})}
                                    autoWidth
                                    label="Grupo pertencente"
                                    required
                                >
                                <MenuItem value="Grupo">
                                    <em>Nenhum</em>
                                </MenuItem>
                                {                                               
                                    grupo.map(grupo =>{
                                        return(
                                            <MenuItem value={grupo.idkey}>{`${grupo.plano.cidade.nome} / ${grupo.plano.descricao} / ${grupo.descricao}`}</MenuItem>
                                    )})                                                
                                }    
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                        
                    </div>
                    <div className='cardCidade'>
                    {
                        link.map(link => {
                            return (
                                <CardListagemDocumento descricao={`ID: ${link.idkey}) ${link.grupo.plano.cidade.nome} - ${link.grupo.plano.descricao} - ${link.grupo.descricao} - *${link.descricao}*`} id={link.idkey}/>
                            )
                        })
                    }
                    </div>
    </>
    )

}

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
    return {
        props: {
            link,
            grupo,
        }
    }
}