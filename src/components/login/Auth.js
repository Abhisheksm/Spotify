import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Auth = ({children}) => {
  const navigate = useNavigate();

  useEffect(()=>
  {
    if(localStorage.getItem('token'))
    {
        navigate('/home')
    }
  },[])
       
    
  return children
}

export default Auth
