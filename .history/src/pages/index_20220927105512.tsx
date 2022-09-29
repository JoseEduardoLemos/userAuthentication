
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
              <input
                {...register('email')}
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              <Button variant="contained" type="submit">Contained</Button>
        </form>  
      </div>
  )
}
