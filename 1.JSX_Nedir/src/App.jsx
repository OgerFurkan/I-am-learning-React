import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let vize = 50;
  let final = 60;
  let isimler = ["Furkan", "Sıla", "Hulusi"];



  return (
    // Birden fazla elemanı bir arada döndürmek için Fragment kullanılır.
    <>
      {/* JSX içinde JavaScript ifadeleri süslü parantez içine alınır. */}
      {
        (vize * 4 / 10) + (final * 6 / 10) >= 50 ? <h1>Geçti</h1> : <h1>Kaldı</h1>
      }
      {
        isimler.map((isim, index) => ( // map fonksiyonu ile dizi elemanları döngü içinde işlenebilir.
          // JSX içinde style vermek için süslü parantez içine alınır.
          // key prop'unun her bir eleman için unique olması gerekir.
          // key prop verilmezse React hata verir. Çünkü React, her bir elemanı ayırt etmek için key prop'unu kullanır.
          <div
            style={{ // JSX içinde style vermek için süslü parantez içine alınır.
              color: "red",
              backgroundColor: "white",
              border: "1px solid black",
            }}
            key={index}>{isim}</div>
        ))
      }

    </>
  )
}

export default App
