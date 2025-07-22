import { configureStore } from '@reduxjs/toolkit'
import  notesReducer  from './UI/notesSlice'

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
})