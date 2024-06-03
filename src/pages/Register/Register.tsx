import { useEffect, useState } from 'react';
import styles from './Register.module.css';
import { useAthentication } from '../../hooks/useAthentication';
import { User } from '../../App';

const Register = () => {
    const [displayName, setDisplayName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [errors, setErrors] = useState('');
    
    const { createUser, error: authError, loading } = useAthentication();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setErrors('');

        const user: User = { displayName, email, password };

        if(password !== confirmPassword) {
            setErrors('As senhas precisam ser iguais');
            return;
        }

        const res = await createUser(user);

    }

    useEffect(() => {
        if(authError) {
            setErrors(authError);
        }
    }, [authError]);
    
    return (
        <div className={styles.register}>
            <h2>Cadastre-se para postar</h2>
            <p>Crie um usuário para poder compartilhar suas histórias</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Nome:</span>
                    <input 
                    type    ="text" 
                    name    ="displayName" 
                    placeholder='Nome do Usuário' 
                    value   ={displayName}
                    onChange={(e: any) => setDisplayName(e.target.value)}
                    required 
                    />
                </label>
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
                <label>
                    <span>Confirme sua senha:</span>
                    <input 
                    type    ="password" 
                    name    ="confirmPassword" 
                    placeholder='Confirme a sua senha' 
                    value   ={confirmPassword}
                    onChange={(e: any) => setConfirmPassword(e.target.value)}
                    required 
                    />
                </label>
                {!loading && <button className='btn'>Confirmar</button>}
                {loading && <button className='btn' disabled>Aguarde...</button>}
                {errors && <p className='error'>{errors}</p>}
            </form>
        </div>
    );

}

export default Register;