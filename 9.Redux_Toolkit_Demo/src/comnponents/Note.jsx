import React from 'react'
import {deleteNote} from "../redux/ui/notesSlice"
import { useDispatch } from 'react-redux';
import { RiDeleteBin4Line } from "react-icons/ri";
import "../css/note.css"
function Note({note}) {
    const {id, title, body,date}=note;
    const dispatch = useDispatch();
    const handleDelete = ()=>{
      dispatch(deleteNote(id))
    }
  return (
    <div className='note-wrapper'>
        <div className="note-header">
          <h2 className="note-title">
            {id} - {title}            
          </h2>
           <RiDeleteBin4Line className="note-delete-icon" onClick={handleDelete}/>
        </div>
        <pre className="note-body">{body}</pre>
        <p className="note-date">{date}</p>
    </div>
  )
}

export default Note