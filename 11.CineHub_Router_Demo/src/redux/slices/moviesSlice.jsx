import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"



const initialState = {
    movies: [],
    favoritesMovies:[],
    status:"idle",
    error:null,
}

export const fetchMoviesByPage=createAsyncThunk("fetchAllMovies",async(page)=>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`)
    console.log(response.data.results)
    return response.data.results;
})


export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchMoviesByPage.pending,(state)=>{
        state.status="loading";
    })
    builder.addCase(fetchMoviesByPage.rejected,(state,action)=>{
        state.status="failed";
        state.error=action.payload;
    })
    builder.addCase(fetchMoviesByPage.fulfilled,(state,action)=>{
        state.status="succeeded";
        state.movies=action.payload;
    })
  }
})

export const {} = moviesSlice.actions
export default moviesSlice.reducer