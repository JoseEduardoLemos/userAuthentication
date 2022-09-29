import React from 'react';
import styles from '../styles/Home.module.css';
export default function Home() {
  return (
    <div className={styles.container}>
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
      <div>
        <input
        id='password'
        name='password'
        autoComplete='current-password'
        required
        placeholder='Senha'
        />
      </div>

    </div>
  )
}
