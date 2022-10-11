import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";

export default function CardExcluirGrupo({id, descricao}){

    const [openExclusao, setOpenExclusao] = useState(true);
    const [openSuccess,setOpenSuccess] = useState(false);
    const router = useRouter();

    interface idCidade {
        idCidade : Number
    }

    async function deletarGrupo (){
        try{
            fetch(`http://localhost:3000/api/grupos/delete/${id}`,{   
                headers : {
                    'Content-type' : 'application/json',
                },
                method: 'DELETE'
            })
            .then(() => {
                setOpenSuccess(true);
                router.replace(router.asPath)
            })
        }catch (error){
            console.log(error);
        }
    }

    const exclusaoCancelar = () => {
        setOpenExclusao(false);
    };

    const exclusaoConfirmar = () => {
        deletarGrupo();
        setOpenExclusao(false);
    };

    const closeSuccess =() =>{
        setOpenSuccess(false);
    }
    return(
        <>

            <div>
                <Dialog
                    open={openExclusao}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {`Deseja excluir permanentemente o grupo "${descricao}"?`}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Após a exclusão, não será possível recuperar o grupo.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={exclusaoCancelar}>Cancelar</Button>
                    <Button variant="contained" id="botaoExcluir" onClick={exclusaoConfirmar} autoFocus>
                        Excluir
                    </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={openSuccess} autoHideDuration={6000} onClose={closeSuccess}>
                    <Alert onClose={closeSuccess} severity="success" sx={{ width: '100%' }}>
                        Grupo alterado com sucesso!
                    </Alert>
                </Snackbar>
        </div>

        </>
    )
}

