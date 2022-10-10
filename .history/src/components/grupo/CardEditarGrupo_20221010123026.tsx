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



export default function CardListagemGrupo({id, descricao}, {cidade, plano}){

    const [form, setForm] = useState<DataForm>({cidadePertencente : null, planoPertencente: null, descricaoGrupo : '', isDisable : true})

    console.log('ENTROU EM EDICAO DE GRUPOS')
    const [openEdicao, setOpenEdicao] = useState(true);

    const router = useRouter();

    interface idCidade {
        idCidade : Number
    }

    async function editarGrupo (data : DataForm){
        try{
            fetch(`http://localhost:3000/api/grupos/delete/${id}`,{   
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
        setOpenEdicao(false);
    }

    return(
        <>

        <div>
        <Dialog open={openEdicao}>
            <DialogTitle>{`Editar informações de "${descricao}"`}</DialogTitle>
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
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className='f12'>
                                            <Button id='botaolimpar' size="large" type='reset' variant="outlined">LImpar</Button>
                                            <Button id='botao' size='large' variant="contained" type="submit">Salvar</Button>
                                        </div>
                                    </div>
                                </form>

            </DialogContent>
            <DialogActions>
            <Button onClick={edicaoCancelar}>Cancel</Button>
            <Button onClick={edicaoConfirmar}>Subscribe</Button>
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