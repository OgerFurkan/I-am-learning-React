import { configureStore } from '@reduxjs/toolkit'
import notesReducer from "./ui/notesSlice"

export const store = configureStore({
  reducer: {
    notes: notesReducer
  },
})
