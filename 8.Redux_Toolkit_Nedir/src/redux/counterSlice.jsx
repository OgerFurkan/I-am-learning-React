import { createSlice } from '@reduxjs/toolkit' 

const initialState = { // initialState: store'un başlangıç state'ini belirlediğimiz objedir.
    value: 0,
  }

export const counterSlice = createSlice({ // createSlice: Bu fonksiyon ile birlikte bir slice oluşturmuş oluyoruz.
// Slice: Store'un içindeki state'leri değiştirmek için kullanılan fonksiyonları ve başlangıç state'ini içinde barındıran bir objedir.
    name: "counter", // name: slice'in ismini belirledikç
    initialState, // Bunu buraya yazmazsak çalışmaz.
    reducers: { // reducers: store'un içindeki state'leri değiştirmek için kullanılan fonksiyonları barındıran objedir.
        arttır: (state) => {  // arttır fonksiyonunu tanımladık
            state.value += 1
        },
        azalt: (state) => { // azalt fonksiyonunu tanımladık
            state.value -= 1
        },
    },
})

export const { arttır, azalt } = counterSlice.actions // actions: slice içindeki fonksiyonları dışarıya aktarmamızı sağlar.
export default counterSlice.reducer