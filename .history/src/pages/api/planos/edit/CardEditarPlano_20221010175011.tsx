import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";

import { useRouter } from "next/router";
import { useState } from "react";



interface DataForm{
    descricao : String
    cidadePertencente : String
    idkey : Number
}



export default function CardListagemGrupo({cidade, plano, grupo}){
    const [form, setForm] = useState<DataForm>({idkey : plano.idkey , descricao : plano.descricao, cidadePertencente : plano.cidade.nome})
    const [openEdicao, setOpenEdicao] = useState(true);

    const router = useRouter();

    async function confirmar (data : DataForm){
        try{
            fetch(`http://localhost:3000/api/planos/edit/${plano.idkey}`,{  
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
        setForm({idkey : plano.idkey, descricao : plano.descricao, cidadePertencente : plano.cidade.nome})
    }

    return(
        <>

        <div>
        <Dialog open={openEdicao}>
            <DialogTitle>{`Editar informações de "${plano.descricao}"`}</DialogTitle>
            <DialogContent>
            <DialogContentText> 
            </DialogContentText>

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
                                                <Button id='botao' size='large' variant="contained" type="submit">Adicionar +</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

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