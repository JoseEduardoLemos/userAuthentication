import { Button, TextField } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import CardListagemGrupo from "../../components/CardListagemGrupo";
import NavBar from "../../components/NavBar";


interface DataForm{
    descricaoGrupo : String
}


export default function CadastrarCidade({grupo}){

    const router = useRouter();
    const [form, setForm] = useState ({descricaoGrupo: ''});

    async function submitForm(data : DataForm){
        
    }


    return(
        <>
        <NavBar></NavBar>
            <div className='titulo'>
                <h1>Cadastro de novo Grupo</h1>
            </div>
            <div>
                        <div>
                            <form onSubmit= {e=>{
                                e.preventDefault()
                                submitForm(form)

                            }>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                name="nomeGrupo"
                                                value={form.descricaoGrupo}
                                                onChange = { e=> setForm({...form, descricaoGrupo : ''})}
                                                fullWidth
                                                label="Nome do Grupo"
                                                variant="outlined"
                                                placeholder="exemplo: Documentos Iniciais"
                                                required
                                            />
                                        </div>
                                        <div className='f12'>
                                            <Button id='botaolimpar' size="large" type='reset' variant="outlined">LImpar</Button>
                                            <Button id='botao' size='large' variant="contained" type="submit">Salvar</Button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='titulo'>
                        <h1>Editar Grupos cadastrados</h1>
                    </div>
                    <div className='cardCidade'>
                    {
                        grupo.map(grupo => {
                            return (
                                <CardListagemGrupo descricao={grupo.descricao} id={grupo.idkey}/>
                            )
                        })
                    }
                    </div>
    </>
    )

}

export async function getServerSideProps() {
    const prisma = new PrismaClient();
    const grupo = await prisma.grupo.findMany({
        orderBy: {
            descricao : 'asc',
        }
    })
    return {
        props: {
            grupo,
        }
    }
}