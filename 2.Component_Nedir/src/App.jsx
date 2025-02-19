import { useState } from 'react'
import './App.css'
import Login from './Login'
import { isimler } from './Login'

function App() {
  console.log(isimler)


  return (
    // Burada Login componentini çağırıyoruz.
    // Component: : Tekrar kullanılabilirlik sağlar.
    <>
      <Login />
      <Login></Login>
    </>
  )
}

export default App
