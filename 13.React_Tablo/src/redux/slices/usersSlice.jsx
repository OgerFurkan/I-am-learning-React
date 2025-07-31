import { createSlice} from '@reduxjs/toolkit'
import {userData} from '../../data/users'

const initialState = {
  users: userData,
  filteredUsers:userData,
  searchQuery:""
}

const filterBySearchQuery=(users,searchTerm)=>{
  if(!searchTerm) {
    return users;
  } 

  return users.filter((user)=>{
     const toArray=[
      user.id,
      user.name,
      user.surname,
      user.email,
      user.age
    ]
    return toArray.some((value)=>{
       return value.toString().toLocaleLowerCase().includes(searchTerm)
    })
  })
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser:(state, action)=>{
      const updatedUser=action.payload;
      const updatedUsers = state.users?.map((user)=>{
        if(user.id===updatedUser.id){
          return updatedUser;
        }
        return user;
      })
      state.users=updatedUsers;
      state.filteredUsers=filterBySearchQuery(state.users,state.searchQuery)
    },
    deleteUserById:(state,action)=>{
      const userId=action.payload;
      const index= state.users?.findIndex((user)=>user.id===userId)

      if(index!==-1){
          state.users.splice(index,1);
      }
      else{
        alert("User not found.")
      }
      state.filteredUsers=filterBySearchQuery(state.users,state.searchQuery)
    },
    addNewUser:(state,action)=>{
        const newUser = action.payload;
        newUser && state.users.push(newUser);
    },
    searchAnUser:(state,action)=>{
      state.searchQuery = action.payload.toString().toLocaleLowerCase();
      state.filteredUsers=filterBySearchQuery(state.users,state.searchQuery)
    }
  }
})

export const {updateUser,deleteUserById,addNewUser,searchAnUser} = usersSlice.actions

export default usersSlice.reducer