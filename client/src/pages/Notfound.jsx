import React from 'react'
import { Link } from 'react-router-dom'

function Notfound() {

    const handleclick=()=>{
   
    }
  return (
    <div>
        <h1 className='error-handle'>The Page is not found!!</h1>
        <h1  className='error-handle1'>please click the below link to go to home</h1>
       <Link className='kol' to='/'>Go to Home</Link>
    </div>
  )
}

export default Notfound