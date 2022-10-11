import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";

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
        disabled : true, disabled2 : false})

    const [openEdicao, setOpenEdicao] = useState(true);
    const router = useRouter();
    const [OpenSuccess, setOpenSuccess] = useState(false);

    async function editarGrupo (data : DataForm){
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
                setOpenSuccess(true);
            })
        }catch (error){
            console.log(error)
        }
    }



    const edicaoCancelar = () =>{
        setOpenEdicao(false);
    }

    const edicaoConfirmar = () =>{
        editarGrupo(form)
        setOpenEdicao(false);
    }

    const closeSuccess = () =>{
        setOpenSuccess(false);
    }

    return(
        <>

        <div>
        <Dialog open={openEdicao}>
            <DialogTitle>{`Editar informações de "${link.descricao}"`}</DialogTitle>
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
                                                name="descricaoDocumento"
                                                value={form.descricao}
                                                onChange = { e=> setForm({...form, descricao : e.target?.value})}
                                                fullWidth
                                                label={"Descricao do documento"}
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
                                                            onChange={e=> setForm({...form, cidadePertencente : e.target.value,
                                                            grupoPertencente : '', planoPertencente : '', disabled2 : true})}
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
                                                            onChange={e=> setForm({...form, planoPertencente : e.target.value, disabled2 : false,
                                                            grupoPertencente : ''})}
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
                                                            disabled={form.disabled2}
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
        <Snackbar open={OpenSuccess} autoHideDuration={6000} onClose={closeSuccess}>
            <Alert onClose={closeSuccess} severity="success" sx={{ width: '100%' }}>
                Documento alterado com sucesso!
            </Alert>
        </Snackbar>
        </div>

        </>
    )
}

