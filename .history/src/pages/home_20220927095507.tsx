import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


export default function Home(){
    const {user} = useContext(AuthContext)
    
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