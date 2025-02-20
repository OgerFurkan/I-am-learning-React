import { useState } from 'react'
import './App.css'
import Product from './Product'
import Parent from './Parent'

function App() {


  return (
    // Ürün adı ve fiyatını Product componentine props olarak gönderiyoruz.
    <>
      <Product name="Monster Notebook" price={21000} />
      <hr />
      <Product name="Apple Iphone 11" price={18500} />
      <hr />
      <Parent> {/* Parent componentine children propsu ile Product componentini gönderiyoruz. */}
        <Product name="Monster Monitör " price={8700} /> {/* Parent componentinin içinde children propsunu yazdırıyoruz. */}
      </Parent>
    </>
  )
}

export default App
