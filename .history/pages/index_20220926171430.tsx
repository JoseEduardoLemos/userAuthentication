import { Button, Checkbox, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';


export default function Home() {

  const {register, handleSubmit} = useForm(); 
  
  function handleSignIn(data){
    console.log(data)
  }
  
  const newLocal = 'teste';
  return (
    <>
      <div>
      <h1 id='h1Grande'>
        Bem-vindo!
      </h1>
        <div className="containerlogin">
            <div className="w-full max-w-md space-y-8">
              <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
                <div id='inputs'>
                  <div>
                    <TextField id="standard-basic" label="E-mail" variant="standard" />
                  </div>
                  <div>
                    <TextField id="standard-basic" label="Senha" variant="standard" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                  <Checkbox defaultChecked />Lembre de mim
                  </div>
                </div>

                <div>
                  <Button>teste</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}
