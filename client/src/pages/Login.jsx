import axios from 'axios'
import React, { useState,useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useNavigate} from 'react-router-dom'
import {AuthContext} from '../helpers/AuthContext'

function Login() {
  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")
  const navigate=useNavigate()
  const {authstate,setauthstate}=useContext(AuthContext)

const loginbtn=()=>{
  const data={username:username,password:password}
  axios.post('http://localhost:3003/auth/login',data)
  .then((reponse)=>{
   if(reponse.data.error){alert(reponse.data.error)}
   else{
   localStorage.setItem("accessToken",reponse.data.token)
   setauthstate({username:reponse.data.username,id:reponse.data.id,status:true})
   
   navigate("/")
   }
  })
  
}

  return (
    <div className='container1'>
       <label className='label1'>Username:</label><br></br>
      <input id="inputCreatepost" type="text" value={username } onChange={(e)=>setusername(e.target.value)}/>
      <br></br>
      <br>
      </br>
     
      <label className='label2'>Password:</label><br></br>
      <br></br>
      <input id="inputCreatepost" type="password"  value={password } onChange={(e)=>setpassword(e.target.value)}/>
      <br></br>
      <br></br>
      <button className='btn2' onClick={loginbtn}>Login</button>
    </div>
  )
}

export default Login