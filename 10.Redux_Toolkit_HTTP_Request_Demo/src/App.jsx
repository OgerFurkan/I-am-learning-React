import { useEffect } from 'react'
import {useSelector,useDispatch} from "react-redux"
import './App.css'
import { fetchAllNotes } from './features/UI/notesSlice';
import { RiDeleteBin4Line } from "react-icons/ri";
import "./css/note.css"

function App() {
  const dispatch = useDispatch();

  const notes= useSelector((store)=>store.notes.value)
  const notesStatus = useSelector((store)=>store.notes.status)
  const error = useSelector((store)=>store.notes.error)

  useEffect(()=>{
   if (notesStatus === 'idle'){dispatch(fetchAllNotes(20))} ;
  },[notesStatus,dispatch])
 

  return (
    <main>
       {notesStatus === 'succeeded' && <div style={{ color: 'green' }}>Notlar yüklendi</div>}
      {notesStatus === 'loading' && <div>Notlar yükleniyor...</div>}
      {notesStatus === 'failed' && <div style={{ color: 'red' }}>Hata oluştu: {error}
        </div>}
     

      {
        notes?.map((note,index)=>( //notesStatus && notes.map(...) de olabilirdi.
          <div className='note-wrapper' key={note.id}>
              <div className="note-header">
              <h2 className="note-title">
              {note.id}. user id = {note.userId}            
              </h2>
              <RiDeleteBin4Line className="note-delete-icon"/>
            </div>
            <pre className="note-body">{note.title}</pre>
            <p className="note-date">22/7/2025</p>
          </div>
        ))
      }
    </main>
  )
}

export default App
