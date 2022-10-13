
import { Button, TextField } from '@mui/material';
import Head from 'next/head';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import NavBarInicial from '../components/NavBarInicial';
import { AuthContext } from '../contexts/AuthContext';

export default function Home() {

  const { register, handleSubmit } = useForm(); 
  const { signIn } = useContext(AuthContext)

  async function handleSignIn(data){
    await signIn(data)
  }
  
  return (
      <>
        <div id='navbartamanho'>
          <NavBarInicial></NavBarInicial>
        </div>
        
        <div className="containerIndex">
        <Head>
          <title>Home</title>
        </Head>    

          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className='corpoformulario'>
              <h1 id='h12index'>Login</h1>
              <div className='f1'>
                <TextField 
                {...register('email')}
                
                id="fullwidth campo" 
                fullWidth
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
                type={'password'}
                />
              </div>
              <div className='f1'>  
                <Button id='botao' size='large' variant="contained" type="submit">Entrar</Button>
              </div>  
            </div>
          </form>  
        </div>
      </>

  )
}
