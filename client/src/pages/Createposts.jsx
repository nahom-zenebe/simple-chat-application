import React,{useContext,useEffect} from 'react';
import './Createposts.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../helpers/AuthContext'



function Createposts() {


  const {authstate,setauthstate}=useContext(AuthContext)

  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };
  const navigate=useNavigate()


useEffect(()=>{
  if(!authstate.status){
    navigate('/login')
  }

},[])




  const onSubmit = (data) => {
 
      axios.post("http://localhost:3003",data)
      .then((response)=>{
       console.log("it is working")
       navigate('/')
  
      })
  
    
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    postText: Yup.string().required('Post text is required'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .max(45, 'Username cannot exceed 15 characters')
      .required('Username is required'),
  });

  return (
    <div className='createpostcontainer'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='container1'>
          <label className='label1'>Title:</label>
          <Field autoComplete='off' id="inputCreatepost" name="title" placeholder="(Ex. John...)" />
          <br></br>
          <br></br>
          <ErrorMessage name='title' component='span'  className='error'/>
      
          <label className='label2'>Posts:</label>
          <Field autoComplete='off' id="inputCreatepost" name="postText" placeholder="(Ex. Posts...)" />
          <br></br>
          <br></br>
          <ErrorMessage name='postText' className='error' component='span' />
         
          <label className='label3'>Username:</label>
          <Field autoComplete='off' id="inputCreatepost" name="username" placeholder="(Ex. John123...)" />
          <br></br>
          <br></br>
          <ErrorMessage name='username' className='error' component='span' />
          <br />
          <button className='btn2' type='submit'>Create Posts</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Createposts;
