import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Profile() {
    const {id}=useParams()
    const[username,setusername]=useState("")
    const[ListofPosts,setListofPosts]=useState([])

    useEffect(()=>{
        axios.get(`http://localhost:3003/auth/basicinfo/${id}`)
        .then((response)=>{
            setusername(response.data.username)

        })
        axios.get(`http://localhost:3003/byuserId/${id}`)
        .then((reponse)=>{
    setListofPosts(reponse.data)
        })

    },[])
  return (
    <div className='profile-container'>
    <div className='basicInfo'>
        <h1 className='user-name'>Username:{username}</h1>
        
 </div>  
    <div className='ListofPosts'>
    {ListofPosts.map((posts,key)=>{
        return <div className='container' key={key} >
          <div className='title'>{posts.title}</div>
          <div className='body' >{posts.postText}</div>
          <div className='footer'>{posts.username}

          
          
     
         
        
          </div>
          </div>


      })}
      
      
      </div>   
        
     </div>
  )
}

export default Profile