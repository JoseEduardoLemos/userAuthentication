import { v4 as uuid } from 'uuid';

type SignInRequestData = {
    email: string;
    senha: string;
}

const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))


export async function signInRequest(data: SignInRequestData){
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

export async function recoverUserInformation(){
    await delay()

    return {
        user :{
            name: 'José Eduardpo',
            email: 'jose.lemos@tributech.com.br',
            avatar_url :'https://github.com/JoseEduardoLemos/png',
        }
    }
}