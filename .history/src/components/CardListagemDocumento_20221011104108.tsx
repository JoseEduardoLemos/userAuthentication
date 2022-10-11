import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/router";
import { useState } from "react";




interface crud {
    editar : boolean
    deletar : boolean
}


export default function CardListagemDocumento({link, grupo, plano, cidade}){
    
    const [crud, setCrud] = useState<crud>({deletar : false, editar : false});

    const router = useRouter();

    
    

    async function deletarDocumento (){
        try{
            console.log('entrou e esta tentando encontrar')
            fetch(`http://localhost:3000/api/documentos/delete/${link.idey}`,{   
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

    const cancelar = () =>{
        setOpen(false);
    }

    const excluir = () =>{
        deletarDocumento(); 
        setOpen(false);
    }

    const ifDelete =() =>{
        setOpen(true);
    }
    return(
        <>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{`ID: ${link.idkey}) ${link.descricao}`}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={editar}><EditIcon/></Button>
                    <Button onClick={ifDelete}><DeleteForeverIcon/></Button>
                </div>
        </div>
        <div>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {`Deseja excluir permanentemente o arquivo "${link.descricao}"?`}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Após a exclusão, não será possível recuperar o documento.
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