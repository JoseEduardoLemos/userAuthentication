import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";



interface DataForm{
    idkey : Number
    descricao : String
    cidadePertencente : String
    planoPertencente : String
    grupoPertencente : String
    disabled : boolean
    disabled2 : boolean
}



export default function CardListagemGrupo({cidade, plano, grupo, link}){

    const [form, setForm] = useState<DataForm>({idkey: link.idkey, cidadePertencente : link.grupo.plano.idkey_cidade,
         planoPertencente: link.grupo.idkey_plano, descricao : link.descricao, grupoPertencente : link.idkey_grupo,
        disabled : true, disabled2 : true})

    const [openEdicao, setOpenEdicao] = useState(true);
    const router = useRouter();


    async function editarGrupo (data : DataForm){
        console.log(data)
        try{
            fetch(`http://localhost:3000/api/documentos/edit/${link.idkey}`,{ 
                body : JSON.stringify(data),
                  
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
                                                value={form.descricao}
                                                onChange = { e=> setForm({...form, descricao : e.target?.value})}
                                                fullWidth
                                                label={"Descricao do grupo"}
                                                variant="outlined"
                                                placeholder={link.descricao}
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
                                                            onChange={e=> setForm({...form, cidadePertencente : e.target.value})}
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
                                                            placeholder={link.grupo.plano.descricao}
                                                        >
                                                        {
                                                            plano.map(function (plano){
                                                                if(form.cidadePertencente == plano.idkey_cidade){ 
                                                                    return(
                                                                        <MenuItem value={plano.idkey}>{plano.descricao}</MenuItem>
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
                                                            placeholder={link.grupo.descricao}
                                                        >
                                                        {
                                                            grupo.map(function (grupo){
                                                                if(form.planoPertencente == grupo.idkey_plano){ 
                                                                    return(
                                                                        <MenuItem value={grupo.idkey}>{grupo.descricao}</MenuItem>
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

