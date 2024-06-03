import './App.css'

// React Router
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';

// Pages
import Home from './pages/Home/Home'
import About from './pages/About/About'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'

// Context
import { AuthProvider } from './context/AuthContext';

// hooks
import { useState, useEffect } from 'react';
import { useAthentication } from './hooks/useAthentication';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';

export type User = {
  displayName: string;
  email: string;
  password: string;
}

function App() {

  const [user, setUser] = useState<User|undefined>(undefined);
  const { auth } = useAthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    // não tá funcionando a tipagem.
    onAuthStateChanged(auth, (userN: (any)) => {setUser(userN)});
  }, [auth]);

  if(loadingUser) return <p>Carregando...</p>;

  return (
    <div className="App">
      <AuthProvider value={ user }>
        <BrowserRouter>
        <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to={'/'} />} />
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to={'/login'} />} />
              <Route path='/dashboard'    element={user ? <Dashboard /> : <Navigate to={'/login'} />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
