import { v4 as uuid } from 'uuid';

type SignInRequestsData = {
    email: string;
    senha: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))


export async function signInRequest(data: SignInRequestsData){
    await delay()

    return{
        token: uuid(),
        user :{
            name: 'José Eduardpo',
            email: 'jose.lemos@tributech.com.br',
            avatar_url :'https://github.com/JoseEduardoLemos/png',
        }
    }
}   