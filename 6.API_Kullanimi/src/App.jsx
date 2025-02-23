import { use, useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const user_URL = 'http://localhost:3000/users' // Burası API'ye istek atacağımız URL
  const [users, setUsers] = useState([]) // API'den dönen verileri tutacağımız state


  //! axios.get() ile API'ye GET isteği atabiliriz.

  const getAllUsers = async () => { // Tüm kullanıcıları getiren fonksiyon
    const response = await axios.get(user_URL) // API'ye GET isteği atıyoruz axios.get() ile
    return response; // API'den dönen veriyi döndürüyoruz
  }

  const getUserById = async (userId) => { // ID'si verilen kullanıcıyı getiren fonksiyon
    const response = await axios.get(`${user_URL}/${userId}`) // API'ye GET isteği atıyoruz axios.get() ile
    console.log(response.data) // API'den dönen veriyi konsola yazdırıyoruz
  }

  //! axios.post() ile API'ye POST isteği atabiliriz.

  const newUse = { // Yeni kullanıcı objesi
    name: `Kullanıcı${Math.floor(Math.random() * 1000)}`, // Rastgele isim üretiyoruz
    age: Math.floor(Math.random() * 80) + 10 // Rastgele yaş üretiyoruz
  }
  const createUser = async (newUser) => { // Yeni kullanıcı oluşturan fonksiyon 
    const response = await axios.post(`${user_URL}`, newUser) // API'ye POST isteği atıyoruz axios.post() ile
    document.location.reload() // Sayfayı yeniliyoruz ki yeni kullanıcı ekranda gözüksün.
  }

  //! axios.put() ile API'ye PUT isteği atabiliriz.

  const updatedUser = { // Güncellenecek kullanıcı objesi
    name: 'Güncellenmiş Kullanıcı', // Güncellenecek isim
    age: -1 // Güncellenecek yaş
  }

  const updateUser = async (userId, updatedUser) => { // Kullanıcıyı güncelleyen fonksiyon
    await axios.put(`${user_URL}/${userId}`, updatedUser) // API'ye PUT isteği atıyoruz axios.put() ile
    document.location.reload() // Sayfayı yeniliyoruz ki güncellenmiş kullanıcı ekranda gözüksün.
  }

  //! axios.delete() ile API'ye DELETE isteği atabiliriz.

  const deleteUser = async (userId) => { // Kullanıcıyı silen fonksiyon
    await axios.delete(`${user_URL}/${userId}`) // API'ye DELETE isteği atıyoruz axios.delete() ile
    document.location.reload() // Sayfayı yeniliyoruz ki silinmiş kullanıcı ekranda gözüksün.
  }


  useEffect(() => { // Component yüklendiğinde çalışacak olan useEffect
    getAllUsers().then(response => setUsers(response.data)) // Tüm kullanıcıları getir ve state'i güncelle
  }
    , [])


  // JSX içerisinde veri çekme işlemi yapmamalıyız. Bu yüzden useEffect kullanarak verileri çekip state'e atıyoruz.

  const getUserID = async (userID) => {
    const response = await axios.get(`${user_URL}/${userID}`)
    return response.data
  }
  return (
    <>
      <h1>
        API - Axios
      </h1>
      <div >
        <h2>
          Users
          <hr />
        </h2>
        <ul>
          {
            users.map(user => (
              <li key={user.id} style={{ listStyleType: 'none' }}>
                <div><button onClick={() => updateUser(user.id, updatedUser)}>
                  Kullanıcıyı Güncelle
                </button></div>
                <div><button onClick={() => deleteUser(user.id)}>
                  Kullanıcıyı Sil
                </button></div>
                <div> Kullanıcı ID: {user.id}</div>
                <div> Kullanıcı Adı: {user.name}</div>
                <div> Kullanıcı Yaşı: {user.age}</div>
                <hr />
              </li>
            ))
          }
        </ul>
      </div>
      <div>
        <button onClick={() => createUser(newUse)}>
          Rastgele Kullanıcı Ekle
        </button>
      </div>

      <h1>Deneme</h1>
      <div>
        {
          //? getUserID(1).then(response => console.log(response
          //? )).catch(err => console.log(err))
          //* Burası çalışır fakat hata verir çünkü fonksiyon içerisinde async kullanılmış.
          //* React ilk render'ını bitirdikten sonra then bloğunu yani asenkron işlemi yeni bir işlem olarak algılar ve tekrar render eder ve loop'a girer.
          //! Bu yüzden JSX içerisinde async fonksiyon kullanılmaz.
          //* Bunun yerine bir buton oluşturup butona tıklandığında async fonksiyonu çalıştırabiliriz.
          //* Veya useEffect içerisinde async fonksiyonu çalıştırabiliriz ve sonucunu state'e atayabiliriz.

          <button onClick={() => getUserID(1).then(response => console.log(response)).catch(err => console.log(err))}>
            1. Kullanıcıyı Getir
          </button>
        }
      </div>

    </>
  )
}

export default App
