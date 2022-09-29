import { Checkbox, TextField } from '@mui/material';
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
      <h1 className="mt-10 text-center text-4x4 font-bold tracking-tight text-gray-900">
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
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  )
}
