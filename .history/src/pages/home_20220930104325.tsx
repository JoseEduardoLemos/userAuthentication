import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useContext, useEffect } from 'react';
import Card from '../components/home/Card';
import NavBar from '../components/NavBar';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';



const profile = ['Your Profile', 'Settings'];

export default function Home( {usuario} ){
    const {user} = useContext(AuthContext)
    
    useEffect(() =>{
        api.get('/Users');
    }, [])

    return( 
        <>
            <NavBar></NavBar>
            <div className="containerPrincipalHome">
                <div className="containerTituloHome">
                    <div className="tituloHome">
                        <h1>Cadastro e edição de documentos PGM</h1>
                    </div>

                    <div className="cardsHome">
                        <div><Card descricao='Gerenciar CIDADES' destino="/cadastro/cidade"></Card></div>
                        <div><Card descricao='Gerenciar PLANOS' destino="/cadastro/plano"></Card></div>
                        <div><Card descricao='Gerenciar GRUPOS' destino="/cadastro/grupo"></Card></div>
                        <div><Card descricao='Gerenciar DOCUMENTOS' destino="/cadastro/arquivo"></Card></div>
                    </div>

                </div>
            </div>
        </>
    )
}


export const getServerSideProps : GetServerSideProps = async (context) => {
    const prisma = new PrismaClient();

    const usuario = await prisma.user.findMany();

    const {['nextauth.token' ]: token} = parseCookies(context)


    if (!token) {
        return{
            redirect:{
                destination: '/',
                permanent : false,
            }
        }
    }

    api.get('/user')

    return{
        props:{
            usuario,
        }
    }
}