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
    const [form, setForm] = useState<DataForm>({descricaoGrupo: ''});

    async function submitForm(data : DataForm){
        try{
            fetch('http://localhost:3000/api/grupos/create/criarGrupo',{
                body : JSON.stringify(data),
                
                headers : {
                    'Content-type' : 'application/json'
                },
                method: 'POST'
            })
            .then(() => {
                setForm(
                    {descricaoGrupo : ''}
                )
            router.replace(router.asPath)
            })
        }catch(error){
            console.log(error);
        }
    }

    async function clearForms(data : DataForm){
        setForm({descricaoGrupo : ''})
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
                                clearForms(form)
                            }}>
                                <div className='cardCidade'>
                                    <div>
                                        <div className='f1'>
                                            <TextField
                                                name="descricaoGrupo"
                                                value={form.descricaoGrupo}
                                                onChange = { e=> setForm({...form, descricaoGrupo : e.target?.value})}
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
            idkey : 'asc',
        }
    })
    return {
        props: {
            grupo,
        }
    }
}