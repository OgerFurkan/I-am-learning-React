import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { addNote, createId} from '../redux/ui/notesSlice'
import "../css/add-note-form.css"
function AddNoteForm() {
    const dispatch=useDispatch();
    const notes=useSelector((state)=>state.notes.value)
    const [title,setTitle]=useState("")
    const [body,setBody]=useState("")
    const handleSubmit=(e)=>{
        e.preventDefault();
        const date = new Date();
        const today = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
        const newNote={
            id:createId(notes),
            title:title,
            body:body,
            date:today
        }
        dispatch(addNote(newNote)); 
        console.log("New note has been dispatched:", newNote);
        setTitle("");
        setBody("");
    }
  return (
        <form onSubmit={handleSubmit} className='add-note-form'>
            <input type="text" className="note-form-title" placeholder='Enter the title...' required onChange={(e)=>setTitle(e.target.value)} value={title}/>
            <textarea className="note-form-body" placeholder='Enter the content...' required onChange={(e)=>setBody(e.target.value)} value={body}></textarea>
            <input type="submit" value="Save" className='note-form-submit' />
        </form>
  )
}
export default AddNoteForm