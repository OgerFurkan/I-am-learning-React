import './App.css'
import UserTable from './components/UserTable'
import { ToastContainer,Flip } from 'react-toastify';
function App() {



  return (
    <>
     <ToastContainer 
        autoClose={2000}
        closeOnClick={true}
        pauseOnHover={true}
        transition={Flip}
    />
     <div className='table-container'>
      <UserTable/>  
      </div>
    </>
   
  )
}

export default App
