import { TextField } from '@mui/material';
import { useForm } from 'react-hook-form';


export default function Home() {

  const {register, handleSubmit} = useForm(); 
  
  function handleSignIn(data){
    console.log(data)
  }
  
  return (
    <>
      <div>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Or{' '}
                  <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                    start your 14-day free trial
                  </a>
                </p>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
              <TextField id="standard-basic" label="Standard" variant="standard" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <TextField id="standard-basic" label="Standard" variant="standard" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
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
