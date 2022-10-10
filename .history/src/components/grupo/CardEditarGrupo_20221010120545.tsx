import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";

export default function CardListagemGrupo({id, descricao}){

    console.log('ENTROU EM EDICAO DE GRUPOS')
    const [openEdicao, setOpenEdicao] = useState(true);

    const router = useRouter();

    interface idCidade {
        idCidade : Number
    }

    async function editarGrupo (){
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
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
                variant="standard"
            />

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

