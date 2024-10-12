import React, { useEffect,useContext, useState } from 'react'
import axios from 'axios'
import './Post.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import {AuthContext} from '../helpers/AuthContext'
function Posts() {
  const {authstate,setauthstate}=useContext(AuthContext)
    const[postObjext,setpostObjext]=useState({})
    const {id}=useParams()
    const[comments,setcomments]=useState([])
   const[newcomment,setnewcomment]=useState('')
    useEffect(()=>{
        axios.get(`http://localhost:3003/byId/${id}`).then((reponse)=>{
          setpostObjext(reponse.data)
        })

        axios.get(`http://localhost:3003/comment/${id}`).then((reponse)=>{
          setcomments(reponse.data)
        })


    },[])
    const navigate=useNavigate()
    const addcomment=()=>{
     axios.post("http://localhost:3003/comment",{commentBody:newcomment,PostId:id}

      ,{
        headers:{
          accessToken: localStorage.getItem("accessToken"),
        }
      }
     )  
     .then((reponse)=>{
      if(reponse.data.error){
        console.log(reponse.data.error)
      }
      else{
        const commentToadd={commentBody:newcomment,username:reponse.data.username}
        setcomments([...comments,commentToadd])
        setnewcomment("")
       

      }

     
     })

    }

    const deletecomment=(id)=>{
      axios.delete(`http://localhost:3003/comment/${id}`,{
        headers:{
          accessToken: localStorage.getItem("accessToken"),
        }
      })
      .then(()=>{
       setcomments(comments.filter((val)=>{
         return val.id!=id
       }))
      })
 

    }
    const deletepost=(id)=>{
      axios.delete(`http://localhost:3003/${id}`,{
        headers:{
          accessToken: localStorage.getItem("accessToken"),
     } })
      .then(()=>{
        alert("are you sure?")
        navigate('/')
        

      })
    }
  return (
    <div className='postPage'>
    <div className='leftSide'>
    <div className='post' id="individual">
    <div className='title'>{postObjext.title}</div>
    <div className='body'>{postObjext.postText}</div>
    <div className='footer'>
      {postObjext.username} {authstate.username===postObjext.username &&(<button onClick={()=>deletepost(id)} className='btn5'>Delete Post</button>)}</div>
   
    
    </div>
    </div>
    <div className='rightSide'>
        <div className='addCommentContainer'>
            <input type='text' value={newcomment} onChange={(e)=>{setnewcomment(e.target.value)}} placeholder='Comment...' autoComplete='off'/>
            <button onClick={addcomment}>Add Comment</button>
        </div> 

        <div className='listOfComments'>
          {
            comments.map((comment,key)=>
              <div key={key} className='comment'>
                {comment.commentBody}
                <br></br>
                <label>Username: {comment.username}</label>
                {authstate.username===comment.username && (<button onClick={()=>deletecomment(comment.id)} >X</button>)}
                </div>
            )
          }

        </div>
        
        
        
        
        </div>
    

</div>
  )
}

export default Posts