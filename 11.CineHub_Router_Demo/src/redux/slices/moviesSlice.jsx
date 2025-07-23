import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"

export const getFavoritesFromLocalStorage = ()=>{
    const favorites = localStorage.getItem("favorites")
    if(favorites){
        return JSON.parse(favorites);
    }
    return [];
}

const initialState = {
    movies: [],
    favoritesMovies:getFavoritesFromLocalStorage(),
    genres:[],
    status:"idle",
    genreStatus:"idle",
    error:null,
    genreError:null,
}

export const fetchAllGenres= createAsyncThunk("fetchAllGenres",async()=>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/genre/movie/list?api_key=${import.meta.env.VITE_API_KEY}`)
    return response.data.genres
})
 

export const fetchMoviesByPage=createAsyncThunk("fetchAllMovies",async(page)=>{
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/movie/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${page}`)
    console.log(response.data.results)
    return response.data.results;
})


export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    addToFavorites:(state, action)=>{
        state.favoritesMovies.push(action.payload)
        localStorage.setItem("favorites",JSON.stringify(state.favoritesMovies))
    },
    removeFromFavorites:(state,action)=>{
        const updatedFavList = state.favoritesMovies?.filter((fav)=>{
           return fav.id!==action.payload
        })
        state.favoritesMovies=updatedFavList
        localStorage.setItem("favorites",JSON.stringify(updatedFavList))
    }
    
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

    builder.addCase(fetchAllGenres.pending,(state)=>{
        state.genreStatus="loading";
    })
    builder.addCase(fetchAllGenres.rejected,(state,action)=>{
        state.genreStatus="failed";
        state.genreError=action.payload;
    })
    builder.addCase(fetchAllGenres.fulfilled,(state,action)=>{
        state.genreStatus="succeeded";
        state.genres=action.payload;
    })
  }
})

export const {addToFavorites, removeFromFavorites} = moviesSlice.actions
export default moviesSlice.reducer