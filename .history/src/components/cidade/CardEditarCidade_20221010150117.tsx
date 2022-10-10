import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";

import { useRouter } from "next/router";
import { useState } from "react";



interface DataForm{
    nomeCidade : String
    urlBrasao : String
}



export default function CardListagemGrupo({cidade, plano, grupo}){

    const [form, setForm] = useState<DataForm>({cidadePertencente : null, planoPertencente: null, descricaoGrupo : '', isDisable : true})

    const [openEdicao, setOpenEdicao] = useState(true);

    const router = useRouter();

    interface idCidade {
        idCidade : Number
    }

    async function confirmar (data : DataForm){
        try{
            fetch(`http://localhost:3000/api/grupos/delete/${cidade.idkey}`,{   
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

    async function clearForms(data : DataForm){
        setForm({nomeCidade : '', urlBrasao : ''})
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
                                                    label="Nome da cidade"
                                                    onChange={e => setForm({...form, nomeCidade : e.target?.value})}
                                                    placeholder="exemplo: Astorga"
                                                    required 
                                                    fullWidth
                                                />
                                            </div>
                                            <div className='f1'>
                                                <TextField
                                                    value={form.urlBrasao}
                                                    name="urlBrasao"
                                                    label="URL do brasão"
                                                    onChange={e => setForm({...form, urlBrasao: e.target.value})}
                                                    placeholder="URL do Brasão"
                                                    required
                                                    fullWidth
                                                />
                                            </div>
                                            <div className='f12'>
                                                    <Button id='botaolimpar' size="large" type='reset' variant="outlined">LImpar</Button>
                                                    <Button id='botao' size='large' variant="contained" type="submit">Adicionar +</Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>

            </DialogContent>
            <DialogActions>
            <Button onClick={edicaoCancelar}>Cancelar</Button>
            <Button onClick={edicaoConfirmar}>Salvar</Button>
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