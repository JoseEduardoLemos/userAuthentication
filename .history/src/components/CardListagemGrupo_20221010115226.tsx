import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/router";
import { useState } from "react";

export default function CardListagemGrupo({id, descricao}){

    const [openExclusao, setOpenExclusao] = useState(false);
    const [openEdicao, setOpenEdicao] = useState(false);

    const ifDelete = () =>{
        setOpenExclusao(true);
    }

    const idEdit = () =>{
        setOpenEdicao(true);
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

    const exclusaoCancelar = () => {
        setOpenExclusao(false);
    };

    const exclusaoConfirmar = () => {
        deletarGrupo();
        setOpenExclusao(false);
    };

    const edicaoCancelar = () =>{
        setOpenEdicao(false);
    }

    const edicaoConfirmar = () =>{
        setOpenEdicao(false);
    }

    return(
        <>
        <div className="card2" >
            
                <div className="titulocard2">
                    <h3>{`ID) ${id}) ${descricao}`}</h3>                    
                </div>
                <div className="iconesEditarExcluir">
                    <Button onClick={editar}><EditIcon/></Button>
                    <Button onClick={ifDelete}><DeleteForeverIcon/></Button>
                </div>
        </div>

    <div>
      <Dialog open={openExclusao}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
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

        <div>
                <Dialog
                    open={openEdicao}
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
        </div>


        </>
    )
}

