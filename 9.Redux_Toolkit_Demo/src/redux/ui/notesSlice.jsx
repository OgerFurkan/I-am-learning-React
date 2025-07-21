import { createSlice } from '@reduxjs/toolkit'

const getNotesFromLocalStorage = ()=>{
  const notesFromLocalStorage = localStorage.getItem("notes");
  if(notesFromLocalStorage){
    return JSON.parse(notesFromLocalStorage);
  }
  return [];
}
export const createId = (notes) => {
  if (!notes || notes.length === 0) {
    return 1;
  }
  return notes.reduce((max,note)=>{Math.max(max,note.id)},0)+1
 
};
const initialState = {
  value: getNotesFromLocalStorage(),
}
export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
        state.value.push(action.payload);
        localStorage.setItem("notes",JSON.stringify(state.value));
    },
    deleteNote: (state, action) => {
        const id = action.payload;
        const index = state.value.findIndex((note)=>note.id===id)
        if(index!=-1){
          state.value.splice(index,1)
        }
        
        localStorage.setItem("notes",JSON.stringify(state.value));
    }
  },
})
export const {addNote,deleteNote} = notesSlice.actions
export default notesSlice.reducer