import { configureStore } from '@reduxjs/toolkit' // Burda redux toolkitin configureStore fonksiyonunu import ettik
import counterReducer from './counterSlice' // Burda counterSlice dosyamızı import ettik

export const store = configureStore({ // Store: basit bir şekilde anlatmak gerekirse, uygulamamızın tüm state'lerini içinde barındıran bir objedir.
  reducer: { // Reducer: store'un içindeki state'leri değiştirmek için kullanılan fonksiyonlardır.
    counter: counterReducer, // counterReducer fonksiyonunu counter ismiyle store'a ekledik
  },
})