import { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import PrismaClient from 'prisma';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';



const profile = ['Your Profile', 'Settings'];

export default function Home(){
    const {user} = useContext(AuthContext)
    
    useEffect(() =>{
        api.get('/Users');
    }, [])

    return( 
        <>
            <h1>Está Logado</h1>
        </>
    )
}


export const getServerSideProps : GetServerSideProps = async (context) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.findMany();

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
            user,
        }
    }
}