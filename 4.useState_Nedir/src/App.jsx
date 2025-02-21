import { useState } from 'react'
import './App.css'

function App() {
  // useState değişken tanımlamadır ve bu değişkenlerin başlangıç değerlerini belirleriz.
  // useState fonksiyonu bir dizi döndürür ve bu dizinin ilk elemanı değişkenin değeri, ikinci elemanı ise bu değişkenin değerini değiştirmek için kullanılan fonksiyondur.
  // Ancak 2. parametre çalışırsa bütün component yeniden render edilir. Yani component içindeki her şey tekrar çalışır.

  const [count, setCount] = useState(0)
  // count değişkeni 0 değeri ile başlar ve setCount fonksiyonu ile bu değişkenin değerini değiştirebiliriz.

  const [names, setNames] = useState(["Furkan", "Sila", "Hulusi"]) // Bu şekilde bir dizi de tanımlanabilir.

  console.log('App render edildi') // Her tıklamada bu console.log çalışır.

  return (
    <>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Arttır</button>
      <button onClick={() => setCount(count - 1)}>Azalt</button>
    </>
  )
}

export default App
