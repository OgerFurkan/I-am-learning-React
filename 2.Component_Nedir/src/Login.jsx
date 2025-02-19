import React from 'react'

let isimler = ["Furkan", "Sıla", "Hulusi"];

function Login() {
    return (

        <>
            <hr />
            <p>Kullanici Adi</p>
            <input type="text" />
            <p>Sifre</p>
            <input type="password" />
            <br />
            <br />
            <button>Giris Yap</button>
        </>


    )
}

export default Login // Login componentini dışa aktarıyoruz. Böylece App.js dosyasında kullanabiliriz.
export { isimler } // isimler dizisini dışa aktarıyoruz. Böylece App.js dosyasında kullanabiliriz.

// Eğer sadece bir kısmı dışa aktarmak istiyorsak şu şekilde yapabiliriz: export { aktarilacak_kisimlar }
// import { aktarilacak_kisimlar } from './dosya_adi' şeklinde import ederiz.
// Örneğin: export {isimler} şeklinde yaparsak sadece isimler dizisini dışa aktarırız.
// export keyword'ü fonskiyonların dışında kullanılır. Fonksiyonlar içinde export kullanılamaz.
