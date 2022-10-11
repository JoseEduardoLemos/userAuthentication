import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";

import { useRouter } from "next/router";
import { useState } from "react";



interface DataForm{
    nomeCidade : String
    urlBrasao : String
    idkey : Number
}



export default function CardListagemGrupo({cidade, plano, grupo}){
    const [form, setForm] = useState<DataForm>({idkey : cidade.idkey ,nomeCidade : cidade.nome, urlBrasao : cidade.urlbrasao})
    const [openEdicao, setOpenEdicao] = useState(true);
    const [openSuccess, setOpenSuccess] = useState(false);

    const router = useRouter();
    async function confirmar (data : DataForm){
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

    const handleClose = () =>{
        setOpenSuccess(true);
    }

    const edicaoCancelar = () =>{
        setOpenEdicao(false);
    }

    const edicaoConfirmar = () =>{
        confirmar(form)
        setOpenSuccess(true)
        setOpenEdicao(false);
    }

    async function clearForms(data : DataForm){
        setForm({idkey : cidade.idkey, nomeCidade : cidade.nomeCidade, urlBrasao : cidade.urlbrasao})
    }

    return(
        <>

        <div>
        <Dialog open={openEdicao}>
            <DialogTitle>{`Editar informações de "${cidade.nome}"`}</DialogTitle>
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
                                                    value={form.nomeCidade}
                                                    name="nomeCidade"
                                                    label={"Nome da cidade"}
                                                    onChange={e => setForm({...form, nomeCidade : e.target?.value})}
                                                    placeholder={`${form.nomeCidade}`}
                                                    required 
                                                    fullWidth
                                                />
                                            </div>
                                            <div className='f1'>
                                                <TextField
                                                    value={form.urlBrasao}
                                                    name="urlBrasao"
                                                    label={"URL do Brasão"}
                                                    onChange={e => setForm({...form, urlBrasao: e.target.value})}
                                                    placeholder={`${form.urlBrasao}`}
                                                    required
                                                    fullWidth
                                                />
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
        <div>
        <Snackbar open={openSuccess} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
        </Snackbar>
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