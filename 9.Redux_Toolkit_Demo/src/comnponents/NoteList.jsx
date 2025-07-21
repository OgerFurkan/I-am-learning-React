
import{useSelector} from "react-redux"
import Note from './Note'
import "../css/note-list.css"
function NoteList() {
const notes=useSelector((state)=>state.notes.value)
  return (
    <div className='note-container'>
        {
            notes?.map((note)=>(
                <Note key={note.id} note={note}/>
            ))
        }
    </div>
  )
}
export default NoteList