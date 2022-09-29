import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';


export default function Home(){
    const {user} = useContext(AuthContext)
    
    useEffetct(() =>{
        api.get('/Users');
    }, [])

    return(
        <>
            <h1>Está Logado</h1>
                <img src={user.avatar_url}/>
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
