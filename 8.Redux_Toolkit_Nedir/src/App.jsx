import { useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { store } from "./redux/store.jsx" // Burda store dosyamızı import ettik
import { arttır, azalt } from './redux/counterSlice' // Burda arttır ve azalt fonksiyonlarını import ettik


function App() {

  const dispatch = useDispatch() // useDispatch: store'a action göndermemizi sağlayan bir hooktur.

  const counter  = useSelector((store) => store.counter) // useSelector: store'daki state'leri okumamızı sağlayan bir hooktur.
  // Burda store'daki counter state'ini okuyup counter değişkenine atadık.
  // store.counter: store'daki counter state'ini okumamızı sağlar. Dönen değer ise initialState'dir.
  
  console.log(counter) // console.log(counter) yazdığımızda initialState'ı görebiliriz.



  return (
    <>
      <h1>Sayaç: {counter.value}</h1> 
      {
        /*
         counter.value: store'daki counter state'ini okumamızı sağlar. Dönen değer initialState'dir.
        */
      }
      <button onClick={() => dispatch(arttır())}>Arttır</button> 
      {
        /*
         dispatch(arttır()): arttır fonksiyonunu çalıştırır ve store'a action gönderir.
         Aynı şey azaılt fonksiyonu için de geçerlidir.
        */
      }
      <button onClick={() => dispatch(azalt())}>Azalt</button>
    </>
  )
}

export default App
