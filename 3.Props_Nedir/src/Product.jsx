import React from 'react'

function Product({ name, price }) {
    // Destructuring yaparak props objesinden name ve price değerlerini alıyoruz.
    // Veya props objesini direk kullanabiliriz. 
    //? function Product(props) {
    //?  return <div>Ürün Adı: {props.name} 
    //? </div> } şeklinde.

    return (
        <div>
            <div>Ürün Adı: {name} </div>
            <div>Ürün Fiyatı: {price} </div>
        </div>
    )
}

export default Product