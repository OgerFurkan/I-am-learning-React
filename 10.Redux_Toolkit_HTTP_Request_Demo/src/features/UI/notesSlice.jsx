import { createSlice,createAsyncThunk  } from '@reduxjs/toolkit'
import axios from "axios"

const getInitialNotes = ()=>{
    const notesFromLocalStorage=localStorage.getItem("notes")
    if(notesFromLocalStorage){
        return JSON.parse(notesFromLocalStorage)
    }
    return [];
}
const initialState={
    value : getInitialNotes(),
    status: "idle",
    error: null 
}


export const fetchAllNotes = createAsyncThunk("notes/fetchAllNotes",async(limit) =>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts?_limit=${limit}`)
    return response.data;
})

export const notesSlice = createSlice({
    name: "notes",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAllNotes.pending,(state)=>{
            state.status="loading"
        })
        builder.addCase(fetchAllNotes.rejected,(state,action)=>{
            state.status="failed"
            state.error=action.error.message;
        })
        builder.addCase(fetchAllNotes.fulfilled, (state,action)=>{
            state.value=action.payload;
            state.status="succeeded"
            localStorage.setItem("notes",JSON.stringify(state.value));
        })
    }
})

export default notesSlice.reducer;