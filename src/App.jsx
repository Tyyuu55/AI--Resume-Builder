import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Header from './components/custom/Header'
import { Toaster } from 'sonner'



function App() {
  const [count, setCount] = useState(0)
  const {user,isLoaded,isSignedIn}=useUser();
  
  if (!isSignedIn && isLoaded) {
    return <Navigate to={'/auth/sign-in'} />;
  }
  
  return (
    <>
    <Header/>
     <Outlet/>
     <Toaster/>
    </>
  )
}

export default App
