import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from "./redux/store.jsx"
import { Provider } from 'react-redux' // Provider: store'u uygulamamıza bağlamamızı sağlayan bir componenttir.


createRoot(document.getElementById('root')).render(
  // Provider componenti içine store'u yazdık.
  // Böylece store'u uygulamamıza bağlamış olduk.
  <Provider store={store}>
      <App />
  </Provider>
  // App componentini Provider componenti içine yazdık. Bu şekilde uygulamamızın her yerinde store'u kullanabiliriz.
)
