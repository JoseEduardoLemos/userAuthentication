import { Button } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/router";
import { useState } from "react";

export default function CardListagem({id, descricao}){

    const [open, setOpen] = useState(false);

    const ifDelete =() =>{
        setOpen(true);
        if(open == true){
            AlertDialog();
        }
    }

    async function AlertDialog() {
        const handleClickOpen = () => {
            setOpen(true);
        };
    
        const handleClose = () => {
            setOpen(false);
        };

        }


    const router = useRouter();
    const editar = async() =>{ 
        console.log('Editar');
        return{
            
        }
    }
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
                router.replace(router.asPath)
            })
        }catch (error){
            console.log(error);
        }
    }


    return(
        <>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{descricao}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={editar}><EditIcon/></Button>
                    <Button onClick={ifDelete}><DeleteForeverIcon/></Button>
                </div>
        </div>
        <div>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open alert dialog
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Use Google's location service?"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                </div>
        </>
    )
}
