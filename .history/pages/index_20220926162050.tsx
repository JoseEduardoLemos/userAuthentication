import { useForm } from 'react-hook-form';
import styles from '../styles/Home.module.css';

export default function Home() {
  const {register, handleSubmit} = useForm(); 
  
  function handleSignIn(){

  }
  return (
    <div className={styles.container}>
      <form className='nt-8 space-t-6' onSubmit={handleSubmit(handleSignIn)}>
        <div>
          <input 
            id='email-adress'
            name='email'
            type='email'
            autoComplete='email'
            required
            className='appearence-none rounded-none relative block w-full px-3 py-2 border border-gray-300'
            placeholder='Endereço de Email'
          />
        </div>

        <br></br>

        <div>
          <input
            id='password'
            name='password'
            autoComplete='current-password'
            required
            placeholder='Senha'
          />
        </div>
      </form>
    </div>
  )
}
