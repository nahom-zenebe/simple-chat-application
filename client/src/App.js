
import Home from "./pages/Home";
import Createposts from './pages/Createposts'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import {AuthContext} from './helpers/AuthContext'
import Notfound from "./pages/Notfound";
import Profile from "./pages/Profile";
import { useState,useEffect } from "react";
import axios from "axios";


function App() {
  const[authstate,setauthstate]=useState({username:"",id:0,status:false})


  useEffect(() => {
    axios
      .get("http://localhost:3003/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setauthstate({...authstate,status:false});
        } else {
          setauthstate({username:response.data.username,
            id:response.data.id,
            status:false});
        }
      });
  }, []);


  const logout=()=>{
    localStorage.removeItem("accessToken")
    setauthstate({username:"",id:0,status:false})

  }







  return (
 
    <AuthContext.Provider value={{authstate,setauthstate}}>
    <Router>
      <nav>
     
      {
        !authstate.status? (
          <>
      <Link className="title2" to='/Login'>Login</Link>
      <Link className="title2" to='/registration'>Registration</Link>
      </>
        ):( 
          <>
           <Link className="title1" to='/'>Home pages</Link>
         <Link className="title2" to='/Createpots'>Create a post</Link>
         
         
          </>
        )}
   
              <h1 className="username">{authstate.username} </h1>
              {authstate.status && <button className="btn4" onClick={logout}> Logout</button>}
           







      </nav>
      <Routes>
        <Route path="/" element={<>
        <Home />
   
        </>} />
        <Route path=":id"  element={<Post/>} />
        <Route path="/Createpots" element={<Createposts/>} />
        <Route path="/Login" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="*" element={<Notfound/>} />
      </Routes>
    </Router>
    </AuthContext.Provider>





  );
}

export default App;
