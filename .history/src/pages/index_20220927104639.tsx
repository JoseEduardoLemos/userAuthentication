
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
  
          <form onSubmit={handleSignIn}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
  )
}
