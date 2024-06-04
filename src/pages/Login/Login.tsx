import { useEffect, useState } from 'react';
import { useAthentication } from '../../hooks/useAthentication';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState('');
  
  const { login, error: authError, loading } = useAthentication();
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    setErrors('');
    
    const user: any = { email, password };
    
    const res = await login(user);
  }

  useEffect(() => {
    if(authError) {
        setErrors(authError);
    }
  }, [authError]);
  
  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça login para utilizar o sistema.</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail:</span>
          <input 
          type    ="email" 
          name    ="email" 
          placeholder='E-mail do Usuário' 
          value   ={email}
          onChange={(e: any) => setEmail(e.target.value)}
          required 
          />
        </label>
        <label>
          <span>Senha:</span>
          <input 
          type    ="password" 
          name    ="Password" 
          placeholder='Insira sua senha' 
          value   ={password}
          onChange={(e: any) => setPassword(e.target.value)}
          required 
          />
        </label>
        {!loading && <button className='btn'>Confirmar</button>}
        {loading && <button className='btn' disabled>Aguarde...</button>}
        {errors && <p className='error'>{errors}</p>}
      </form>
    </div>
  )
}

export default Login;