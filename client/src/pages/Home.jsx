
import React,{useEffect,useState} from 'react'
import axios  from 'axios'
import { useNavigate } from 'react-router-dom'
import { BiSolidLike } from "react-icons/bi";
import { Link } from 'react-router-dom';
function Home() {
  const[listofPosts,setlistofPosts]=useState([])
  const navigate=useNavigate()



  useEffect(()=>{
    axios.get("http://localhost:3003")
    .then((response)=>{
     setlistofPosts(response.data)

    })

  },[])

const likeapost=(postId)=>{
  axios.post("http://localhost:3003/likes",{PostId:postId},{
    headers:{
      accessToken: localStorage.getItem("accessToken"),
    }
  }).then((response)=>{
 
    setlistofPosts(listofPosts.map((post)=>{
      if(post.id===postId){
        if(response.data.liked){
          return {...post,Likes:[...post.Likes,0]}

        }
        else{
          const likesarray=post.Likes
          likesarray.pop()
          return {...post,Likes:likesarray}
        }
        

      }
      else{
        return post
      }
        
      
    }))
  })
}





  return (

    <div className='app'>

{listofPosts.map((posts,key)=>{
        return <div className='container' key={key} >
          <div className='title'>{posts.title}</div>
          <div className='body' onClick={()=>navigate(`/${posts.id}`)}>{posts.postText}</div>
         <div className='footer'> <Link className='linktoprofile' to={`/profile/${posts.UserId}`}>{posts.username}</Link>

          <BiSolidLike className='like-btn' onClick={()=>likeapost(posts.id)}/>
          
     
         
          <label>{posts.Likes.length}</label>
          </div>
          </div>


      })}
    </div>
  )
}

export default Home