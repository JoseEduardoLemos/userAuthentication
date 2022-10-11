import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import { useRouter } from "next/router";
import { useState } from "react";

export default function CardExcluirPlano({cidade, plano}){

    const [openExclusao, setOpenExclusao] = useState(true);

    const router = useRouter();

    interface idCidade {
        idCidade : Number
    }

    async function deletarGrupo (){
        try{
            fetch(`http://localhost:3000/api/cidades/delete/${id}`,{   
                headers : {
                    'Content-type' : 'application/json',
                },
                method: 'DELETE'
            })
            .then(() => {
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


    return(
        <>

            <div>
                <Dialog
                    open={openExclusao}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {`Deseja excluir permanentemente a cidade "${descricao}"?`}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Após a exclusão, não será possível recuperar a cidade.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={exclusaoCancelar}>Cancelar</Button>
                    <Button variant="contained" id="botaoExcluir" onClick={exclusaoConfirmar} autoFocus>
                        Excluir
                    </Button>
                    </DialogActions>
                </Dialog>
        </div>

        </>
    )
}

