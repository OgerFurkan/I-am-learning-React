import React, {useState}from 'react'
import { useDispatch } from 'react-redux';
import {addNewUser } from '../redux/slices/usersSlice';
function AddUserForm() {
    const dispatch = useDispatch();
    const createAnId=()=>{
      return (Math.random()*9999).toFixed(0)
    }

    const [newUser,setNewUser]=useState({
    id:createAnId(),
    name:"",
    surname:"",
    email:"",
    age:""
  })

    const handleAddNewUser=(e)=>{
    e.preventDefault();
    dispatch(addNewUser(newUser))
    console.log("The user has been added",`'${newUser.id} - ${newUser.name}`)
    setNewUser({
      id:createAnId(),
      name:"",
      surname:"",
      email:"",
      age:""
    })
  }
  const handleNewUserChange=(e)=>{
    const{name,value}= e.target;
    setNewUser({
      ...newUser,
      [name]:value
    })
  }
  const handleClearInputs = ()=>{
    setNewUser({
      id:createAnId(),
      name:"",
      surname:"",
      email:"",
      age:""
    })
  }
  return (
    <form onSubmit={handleAddNewUser}         className='add-user-form'>
          <h1>Add A New User</h1>
            <input type="text" name="name" placeholder='Full Name' value={newUser.name} onChange={handleNewUserChange} required/>
            <input type="text" name="surname" placeholder='Last Name' value={newUser.surname}  onChange={handleNewUserChange} required/>
            <input type="email" name="email" placeholder='Email Address' value={newUser.email} onChange={handleNewUserChange} required/>
            <input type="number" name="age" placeholder='Age' value={newUser.age}  onChange={handleNewUserChange} required/>
            <div className="button-wrapper">
              <input type="submit" value="Save" />
              <input type="reset" value="Clear" onClick={handleClearInputs} />
            </div>
    </form>
  )
}

export default AddUserForm