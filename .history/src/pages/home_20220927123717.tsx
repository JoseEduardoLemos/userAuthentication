import { PrismaClient } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { useContext, useEffect } from 'react';
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
            <h1>Está Logado</h1>
            <h3>{usuario.idkey}</h3>
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