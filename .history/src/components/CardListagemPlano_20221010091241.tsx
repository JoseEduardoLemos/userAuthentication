import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/router";
import { useState } from "react";


export default function CardListagemPlano( {id, descricao, nomeCidade}){
    
    const [open, setOpen] = useState(false);

    const router = useRouter();
    const editar = async() =>{ 
        console.log('Editar');
        return{
            
        }
    }
    interface idCidade {
        idCidade : Number
    }

    async function deletarPlano (){
        try{
            fetch(`http://localhost:3000/api/planos/delete/${id}`,{   
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

    const idDelete =() =>{
        setOpen(true);
    }

    return(
        <>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{descricao}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={editar}><EditIcon/></Button>
                    <Button onClick={deletarPlano}><DeleteForeverIcon/></Button>
                </div>
        </div>
        <div>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {`Deseja excluir permanentemente a cidade "${descricao}"?`}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ap??s a exclus??o, n??o ser?? poss??vel recuperar a cidade.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={cancelar}>Cancelar</Button>
                    <Button variant="contained" id="botaoExcluir" onClick={excluir} autoFocus>
                        Excluir
                    </Button>
                    </DialogActions>
                </Dialog>
        </div>
        </>
    )
}