import React from 'react';
import './Createposts.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';


function Registration() {



    const initialValues = {
        username:"",
        password:"",

      };
      
    
      const onSubmit = (data) => {
     
          axios.post("http://localhost:3003/auth",data)
          .then((response)=>{
           console.log("it is working")

      
          })
      
        
      };
    
      const validationSchema = Yup.object().shape({
        username: Yup.string().min(3).max(30).required('username is required'),
        password: Yup.string().min(4).max(20).required('password  is required'),
        
      });
    





    
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='container1'>
          <label className='label1'>Username:</label>
          <Field autoComplete='off' id="inputCreatepost" name="username" placeholder="(Ex. John...)" />
          <br></br>
          <br></br>
          <ErrorMessage name='username' component='span'  className='error'/>
      
          <label className='label2'>Password:</label>
          <Field autoComplete='off' type='password' id="inputCreatepost" name="password" placeholder="(Ex. password...)" />
          <br></br>
          <br></br>
          <ErrorMessage name='password' className='error' component='span' />
         
          <br></br>
          <button className='btn2' type='submit'>Register</button>
        </Form>
      </Formik>
  )
}

export default Registration