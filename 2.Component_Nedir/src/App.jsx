import { useState } from 'react'
import './App.css'
import Login from './Login' // Login componentini import ediyoruz.
import { isimler } from './Login' // isimler dizisini import ediyoruz.

function App() {
  console.log(isimler) // isimler dizisini konsola yazdırıyoruz.


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
