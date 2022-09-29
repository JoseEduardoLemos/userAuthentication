
import { Button, TextField } from '@mui/material';
import Head from 'next/head';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../contexts/AuthContext';

export default function Home() {

  const { register, handleSubmit } = useForm(); 
  const { signIn } = useContext(AuthContext)

  async function handleSignIn(data){
    await signIn(data)
  }
  
  return (
    <div className="containerIndex">
      <Head>
        <title>Home</title>
      </Head>    
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className='corpoformulario'>
            <h2>Login</h2>
            <div className='f1'>
              <TextField 
              {...register('email')}
              id="outlined-basic" 
              label="Endereço de email" 
              variant="outlined" 
              placeholder="Seu email"
              autoComplete= "email"
              required
              />
            </div>
            <div className='f1'>
              <TextField 
              {...register('senha')}
              id="outlined-basic" 
              label="Senha" 
              variant="outlined" 
              placeholder="Sua senha"
              autoComplete= "senha"
              required
              />
            </div>
            <div className='f1'>  
              <Button size='larger' variant="contained" type="submit">Entrar</Button>
            </div>  
          </div>
        </form>  
      </div>
  )
}
