import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"


export const fetchMovieById= createAsyncThunk("fetchMovieById",async(id)=>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`)
    return response.data
})
export const fetchMovieVideoById= createAsyncThunk("fetchMovieVideoById",async(id)=>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/${id}/videos?api_key=${import.meta.env.VITE_API_KEY}&&language=en-US`)
    return response.data.results[0].key
})

const initialState = {
    movie:[],
    key:null,
    status:"idle",
    error:null,
}

export const movieDetailsSlice = createSlice({
  name: 'movieDetail',
  initialState,
  reducers: {

  },
  extraReducers:(builder)=>{
    builder.addCase(fetchMovieById.fulfilled,(state,action)=>{
        state.movie=action.payload;
        state.status="succeeded"
    })
      builder.addCase(fetchMovieById.rejected,(state)=>{
        state.status="failed"
        state.error=action.payload;
    })
     builder.addCase(fetchMovieById.pending,(state)=>{
        state.status="loading"
    })

    builder.addCase(fetchMovieVideoById.fulfilled,(state,action)=>{
        state.key=action.payload
    })
   
}
})

export const {} = movieDetailsSlice.actions
export default movieDetailsSlice.reducer