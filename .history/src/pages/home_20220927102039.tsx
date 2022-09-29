import { GetServerSideProps } from 'next';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

export default function Home(){
    const {user} = useContext(AuthContext)
    
    useEffect(() =>{
        api.get('/Users');
    }, [])

    return( 
        <>
            <h1>Está Logado</h1>
                <p>
                    nome : {user.name}
                    <br></br>
                    email: {user.email}
                </p>
        </>
    )
}

function useEffetct(arg0: () => void) {
    throw new Error('Function not implemented.');
}


export const getServerSideProps : GetServerSideProps = async (context) => {

    console.log(context.req.cookies)

    return{
        props:{

        }
    }
}