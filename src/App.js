import Home from './Componentes/Home'
import Login from './Componentes/Login'
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  const [user,setUser] = useState();
  useEffect(()=>{
    const usuarioLogged = window.localStorage.getItem("logged");
    if(usuarioLogged){
      const u = JSON.parse(usuarioLogged);
      setUser(u);
    }
  },[]);
  return (
    <BrowserRouter>
      <Routes>
        {user && (<>
        <Route path="/" element={<Home/>}/>    
        </>
        )}
        {!user && (<>
          <Route path="/login" element={<Login/>}/>
        </>
        )}
        <Route path="*" element={<Navigate to={user ? "/" : "/login"}/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
