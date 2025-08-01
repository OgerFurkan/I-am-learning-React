import { createSlice} from '@reduxjs/toolkit'
import {userData} from '../../data/users'

const getUsersFromLocalStorage = ()=>{
  const usersFromLocaleStorage = localStorage.getItem("users")
  if(usersFromLocaleStorage){
    return JSON.parse(usersFromLocaleStorage)
  }
  return userData
}

const storedUsers = getUsersFromLocalStorage();

const saveUsersToLocalStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};


const initialState = {
  users:storedUsers,
  filteredUsers:storedUsers,
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
      return value.toString().toLocaleLowerCase().trim().includes(searchTerm)
    })
  })
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUser:(state, action)=>{
      const updatedUser=action.payload;
      state.users = state.users?.map((user)=>{
        if(user.id===updatedUser.id){
          return updatedUser;
        }
        return user;
      })
      state.filteredUsers=filterBySearchQuery(state.users,state.searchQuery)
      saveUsersToLocalStorage(state.users);
    },
    deleteUserById:(state,action)=>{
      const userId=action.payload;
      state.users = state.users.filter((user) => user.id !== userId);
      state.filteredUsers=filterBySearchQuery(state.users,state.searchQuery)
      saveUsersToLocalStorage(state.users);
    },
    addNewUser:(state,action)=>{
        const newUser = action.payload;
        newUser && state.users.push(newUser);
        state.filteredUsers=filterBySearchQuery(state.users,state.searchQuery)
        saveUsersToLocalStorage(state.users);
    },
    searchAnUser:(state,action)=>{
      state.searchQuery = action.payload.toString().toLocaleLowerCase().trim()
      state.filteredUsers=filterBySearchQuery(state.users,state.searchQuery)
    }
  }
})

export const {updateUser,deleteUserById,addNewUser,searchAnUser} = usersSlice.actions

export default usersSlice.reducer