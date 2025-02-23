import { useEffect, useState } from 'react'
import './App.css'

function App() {

  useEffect(() => {
    console.log("Veri tabanından veriler alındı.")
    // Bu şekilde 2. parametre olarak boş bir dizi verirsek sadece İLK RENDER OLDUĞUNDA ÇALIŞIR.
    // Ancak 2. parametre verilmezse her render olduğunda çalışır.
    // Örneğin bir veri tabanından veri çekmek istediğimizde sadece bir kere çalışmasını isteriz.
    // Veya burayı bir constructor veya componentDidMount gibi düşünebiliriz.
  }
    , [])

  const [firstName, setFirstName] = useState("Furkan")
  const [lastName, setLastName] = useState("Öger")

  useEffect(() => {
    console.log("Ad Soyad güncellendi.")
    console.log("İsim Güncellendi : " + firstName)
    console.log("Soyad Güncellendi : " + lastName)
    // Bu şekilde 2. parametre olarak bir değişken verirsek sadece bu değişken DEĞİŞTİĞİNDE VE İLK RENDER OLDUĞUNDA ÇALIŞIR.
    // Örneğin bir veri tabanına veri kaydetmek istediğimizde sadece bu değişken değiştiğinde çalışmasını isteriz.
    // Veya burayı bir componentDidUpdate gibi düşünebiliriz.
  }
    , [firstName, lastName])



  return (
    <>
      <div>
        <button onClick={() => setFirstName("Sıla")}>
          Adi Değiştir
        </button>
      </div>

      <div>
        <button onClick={() => setLastName("Kasalı")}>
          Soyadi Değiştir
        </button>
      </div>


    </>
  )
}

export default App
