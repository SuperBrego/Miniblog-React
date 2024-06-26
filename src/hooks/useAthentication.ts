import { Auth, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { User } from '../App';
import { db } from "../firebase/config";

type AuthReturnType = {
  auth: Auth;
  createUser: (data: User) => Promise<void>;
  error: string;
  loading: boolean;
  logout: () => void;
  login: (data: any) => void;
};


export const useAthentication = (): AuthReturnType => {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Isso aqui é grave e muito chato: eu preciso chamar o db 
  // dentro da função de alguma maneira para funcionar a 
  // página e entender que tá sendo usado o Firebase App. 
  // Pode ser até um console.log, mas isso abaixo funcionou.
  // Outra solução tem na aula 141 do curso.
  db.app;

  // Cleanup

  // Lidar com memory leak
  const [cancelled, setCancelled] = useState<boolean>(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if(cancelled) return;
    
  }

  // *********************************************************
  // Registro.
  // *********************************************************
  const createUser = async (data: User): Promise<void> => {
    checkIfIsCancelled();

    setLoading(true);
    setError('');

    try {
      
      const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

      await updateProfile(user, { displayName: data.displayName, });

      // return user;

    } catch (error: any) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage: string;
      if(error.message.includes('Password')) {
        systemErrorMessage = 'A senha precisa conter pelo menos seis caracteres.';
      } else if(error.message.includes('email-already')) {
        systemErrorMessage = 'E-mail já cadastrado.';
      } else {
        systemErrorMessage = 'Ocorreu um erro. Por favor, tente mais tarde.'
      }

      setLoading(false);
      setError(systemErrorMessage);
    }

    setLoading(false);
  }

  // *********************************************************
  // Logout
  // *********************************************************
  const logout = () => {
    checkIfIsCancelled();

    signOut(auth);
  }

  // *********************************************************
  // Login
  // *********************************************************
  const login = async(data: any) => {
    checkIfIsCancelled();

    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setLoading(false);

    } catch (error: any) {

      let systemErrorMessage: string = '';

      // Firebase descontinuou as mensagens específicas.
      if (error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuário não encontrado.";
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "Senha incorreta.";
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tenta mais tarde.";
      }

      setError(systemErrorMessage);
      setLoading(false);
    } finally {
      // setLoading(false);
    }

  }

  useEffect(() => {
    return () => setCancelled(true);
  }, []);
  
  return { auth, createUser, error, loading, logout, login };
  
}