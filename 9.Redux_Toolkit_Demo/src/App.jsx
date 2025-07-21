import './App.css'
import NoteList from './comnponents/NoteList'
import AddNoteForm from './comnponents/AddNoteForm'
import { useSelector } from 'react-redux'
function App() {
  return (
    <main> 
      <AddNoteForm/>
      <NoteList/>
    </main>
  )
}
export default App