import React, { Children, useState } from 'react'
import style from './ProtectRoute.module.css'
import { Navigate } from 'react-router-dom'

export default function ProtectRoute({children}) {

  if (localStorage.getItem('userToken')) {
    return children
  } else {
    return <Navigate to={'/login'}/>
  }

}
