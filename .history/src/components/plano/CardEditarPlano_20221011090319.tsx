import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";



interface DataForm{
    descricao : String
    cidadePertencente : String
}



export default function CardListagemGrupo({plano, cidade}){
    const [form, setForm] = useState<DataForm>({descricao : plano.descricao, cidadePertencente : plano.cidade.nome})
    const [openEdicao, setOpenEdicao] = useState(true);

    const router = useRouter();

    async function confirmar (data : DataForm){
        console.log(JSON.stringify(data))
        try{
            fetch(`http://localhost:3000/api/cidades/edit/${cidade.idkey}`,{  
                body: JSON.stringify(data),
                 
                headers : {
                    'Content-type' : 'application/json',
                },
                method: 'PUT'
            })
            router.replace(router.asPath)
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
        confirmar(form)
        setOpenEdicao(false);
    }

    async function clearForms(data : DataForm){
        setForm({descricao :'', cidadePertencente :''})
    }

    return(
        <>

        <div>
        <Dialog open={openEdicao}>
            <DialogTitle>{`Editar informações de "${plano.descricao}"`}</DialogTitle>
            <DialogContent>
            <DialogContentText> 
            </DialogContentText>

            <form onSubmit = {e =>{
                                    e.preventDefault()
                                    confirmar(form)
                                    clearForms(form)
                                }}>
                                    <div className='cardCidade'>
                                        <div>
                                            <div className='f1'>
                                                <TextField
                                                    id='nomeCidade'
                                                    value={form.descricao}
                                                    name="nomeCidade"
                                                    label={"Descricao do plano"}
                                                    onChange={e => setForm({...form, descricao : e.target?.value})}
                                                    placeholder={`${form.descricao}`}
                                                    required 
                                                    fullWidth
                                                />
                                            </div>
                                            <div className='f1'>
                                                <FormControl sx={{m : 0, minWidth: 220}}>
                                                    <InputLabel id="demo-simple-select-autowidth-label">Cidade:</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-autowidth-label"
                                                        id="demo-simple-select-autowidth"
                                                        value={plano.cidade.nome}
                                                        onChange={e=> setForm({...form, cidadePertencente : e.target.value})}
                                                        autoWidth
                                                        label={form.cidadePertencente}
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
