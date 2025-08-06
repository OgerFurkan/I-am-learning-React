import { configureStore } from '@reduxjs/toolkit'
import  moviesReducer  from './slices/moviesSlice'
import genreReducer from './slices/genreSlice'
import movieDetailsReducer  from './slices/movieDetailsSlice'

export const store = configureStore({
  reducer: {
    movies:moviesReducer,
    genres:genreReducer,
    movieDetails:movieDetailsReducer,
  },
})