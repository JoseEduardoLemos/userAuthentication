import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";

import { useRouter } from "next/router";
import { useState } from "react";



interface DataForm{
    descricaoGrupo : String
    cidadePertencente : String
    planoPertencente : String
    isDisable : boolean
}



export default function CardListagemGrupo({cidade, plano, grupo}){

    const [form, setForm] = useState<DataForm>({cidadePertencente : grupo.plano.idkey_cidade, planoPertencente: grupo.idkey_plano, descricaoGrupo : grupo.descricao, isDisable : true})

    const [openEdicao, setOpenEdicao] = useState(true);
    console.log(grupo)
    const router = useRouter();

    interface idCidade {
        idCidade : Number
    }

    async function editarGrupo (data : DataForm){
        try{
            fetch(`http://localhost:3000/api/grupos/edit/${grupo.idkey}`,{   
                headers : {
                    'Content-type' : 'application/json',
                },
                method: 'PUT'
            })
            .then(() => {
                router.replace(router.asPath)
            })
        }catch (error){
            console.log(error);
        }
    }



    const edicaoCancelar = () =>{
        setOpenEdicao(false);
    }

    const edicaoConfirmar = () =>{
        editarGrupo(form)
        setOpenEdicao(false);
    }

    return(
        <>

        <div>
        <Dialog open={openEdicao}>
            <DialogTitle>{`Editar informações de "${grupo.descricao}"`}</DialogTitle>
            <DialogContent>
            <DialogContentText> 
            </DialogContentText>

                                <form onSubmit={e=>{
                                    e.preventDefault
                                    editarGrupo(form)
                                }}>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                name="descricaoGrupo"
                                                value={form.descricaoGrupo}
                                                onChange = { e=> setForm({...form, descricaoGrupo : e.target?.value})}
                                                fullWidth
                                                label={"Descricao do grupo"}
                                                variant="outlined"
                                                placeholder={grupo.descricao}
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
                                                            label={"Cidade pertencente"}
                                                            placeholder={grupo.descricao}
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
                                                            placeholder={grupo.plano.descricao}
                                                        >
                                                        {
                                                            plano.map(function (plano){
                                                                if(plano.idkey_cidade === cidade.idkey){ 
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
                                </form>

            </DialogContent>
            <DialogActions>
            <Button id='botaolimpar' onClick={edicaoCancelar}>Cancelar</Button>
            <Button id='botao' onClick={edicaoConfirmar}>Salvar</Button>
            </DialogActions>
        </Dialog>
        </div>

        </>
    )
}

export async function getServerSideProps(){
    const prisma = new PrismaClient();

    const cidade = await prisma.cidade.findMany();
    const plano = await prisma.plano.findMany();

    return{
        props: {
            cidade,
            plano,
        }
    }
}