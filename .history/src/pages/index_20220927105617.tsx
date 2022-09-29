
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
          <h2>Login</h2>
    
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div>
              <TextField 
              {...register('email')}
              id="outlined-basic" 
              label="Endereço de email" 
              variant="outlined" 
              placeholder="Seu email"
              autoComplete= "email"
              required
              />
              <TextField 
              {...register('senha')}
              id="outlined-basic" 
              label="Senha" 
              variant="outlined" 
              placeholder="Sua senha"
              autoComplete= "senha"
              required
              />
              <Button variant="contained" type="submit">Entrar</Button>
          </div>
        </form>  
      </div>
  )
}
