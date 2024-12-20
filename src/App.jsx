import Login from './Components/Login'
import { BrowserRouter,Routes,Route,Navigate,Outlet } from 'react-router-dom'
import Admin from './Components/Admin'
import Home from './Components/Home'
import Cookies from 'js-cookie'
import './App.css'


function App() {
  const ProtectedRoute = () => {
    const token = Cookies.get(process.env.JWT_COOKIE_NMAE);
    return token ? <Outlet /> : <Navigate to="/login" replace />;
  };

  return (
    <div className='root'>
      
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route  element={<ProtectedRoute/>}>
      <Route path='/admin' element={<Admin/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>

    </div>
  )
}

export default App
