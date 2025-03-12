import { useReducer } from 'react'
import './App.css'

function App() {
  // useReducer, useState ile aynı işi yapar. Ancak daha karmaşık state yönetimlerinde daha kullanışlıdır.
  // useReducer, state ve dispatch adında iki adet değer döndürür.
  // state, state'in güncel değerini tutar.
  // dispatch, state'i güncellemek için kullanılır.
  // initialState, state'in başlangıç değerini tutar.
  // reducer, state'i güncellemek için kullanılan fonksiyondur.

  const initialState = {
    count: 0
  }
  // initialState, count adında bir obje içerir ve count'un başlangıç değeri 0'dır.

  const reducer = (state, action)=>{
    switch(action.type){ // action'ın type özelliğine göre işlem yaparız.
      case "arttır": // action'ın type özelliği "arttır" ise count'u 1 arttırırız.
        return {count: state.count + 1}  // state'in count özelliğine 1 ekleriz.
      case "azalt": 
        return {count: state.count - 1}
      case "sıfırla": // action'ın type özelliği "sıfırla" ise count'u initialState ile başlangıç değerine eşitleriz.
        return initialState
      case "bilinmeyen": // action'ın type özelliği "bilinmeyen" ise count'u rastgele bir sayı ile arttırırız.
        return {count: state.count + Math.floor(Math.random() * 10)}
      case "payload": // payload, action'ın içerisindeki veriyi tutar. Bu veriyi kullanarak state'i güncelleyebiliriz.

        return {count: state.count + action.payload}
      default: // action'ın type özelliği yukarıdaki case'lerden biri değilse state'i olduğu gibi döndürürüz.
        return state
  }
}
  // reducer, state'i güncellemek için kullanılan fonksiyondur.
  // reducer, state ve action adında iki adet parametre alır.
  // state, state'in güncel değerini tutar.
  // action, type adında bir özelliğe sahiptir. type ile hangi işlemi yapacağımızı belirtiriz.
  
  const [state, dispatch] = useReducer(reducer, initialState)
  // state, 0 değerini tutar.
  // dispatch, state'i güncellemek için kullanılır.

  return (
    <>
      <h1>{state.count}</h1>
      <button onClick={()=>dispatch({type:"arttır"})}>1 Arttır</button>
      <button onClick={()=>dispatch({type:"azalt"})}>1 Azalt</button>
      <button onClick={()=>dispatch({type:"sıfırla"})}>Sıfırla</button>
      <button onClick={()=>dispatch({type:"payload", payload:3})}>3 Arttır</button>
      <button onClick={()=>dispatch({type:"bilinmeyen"})}>Bilinmeyen</button>
    </>
  )
}

export default App
