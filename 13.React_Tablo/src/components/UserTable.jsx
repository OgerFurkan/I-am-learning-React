import React, {useEffect, useState } from 'react'
import {useSelector,useDispatch} from "react-redux"
import "../css/UserTable.css"
import { deleteUserById, updateUser,searchAnUser } from '../redux/slices/usersSlice';

function UserTable() {

  const dispatch=useDispatch();
  const users = useSelector((store)=>store.users.users);
  const searchedUsers = useSelector((store)=>store.users.filteredUsers)
  const columnHeaders = users.length>0 ?  Object.keys(users[0]) : []
  useEffect(()=>{
    dispatch(searchAnUser(""))
  },[])
 


  const [editable,setEditable]=useState({
    id:null,
    state:false
  })

  
  const [editName,setEditName]=useState("")
  const [editSurname,setEditSurname]=useState("")
  const [editEmail,setEditEmail]=useState("")
  const [editAge,setEditAge]=useState("")
  


  const handleChange = (e)=>{
   const input= e.target.className;
   if(input==='input-name'){
    setEditName(e.target.value)
   }
   else if(input==='input-surname'){
    setEditSurname(e.target.value)
   }
   else if(input==='input-email'){
    setEditEmail(e.target.value)
   }
   else{
    setEditAge(e.target.value)
   }
  }
  const handleEditable = (id,user)=>{
    setEditable({
      id:id,
      state:!editable.state
    })
    setEditName(user.name)
    setEditSurname(user.surname)
    setEditEmail(user.email)
    setEditAge(user.age)
  }
  const cancelEdit =()=>{
    setEditable({
      id:null,
      state:false
    })
  }
  const handleUpdate=(id)=>{
    const updatedUser={
      id,
      name:editName,
      surname:editSurname,
      email:editEmail,
      age:editAge
    }
    dispatch(updateUser(updatedUser))
    console.log("The user has been updated.")
    setEditable({
      id:null,
      state:false
    })
  }
  const handleDelete=(id)=>{
    dispatch(deleteUserById(id))
     console.log("The user has been deleted.")
  }
   if(!users || users.length===0){
    return(
     <div className='no-users-info'>There are no user!</div> 
    )
  }

  return (
    <>
    <div className="user-search">
        <input type="text" onChange={(e)=>dispatch(searchAnUser(e.target.value))} />
      </div>
    <div className='table-wrapper'>
    <table>
      <thead>
        <tr>
        {
          columnHeaders?.map((head,key)=>(
              <th key={key}>
                {head}
              </th>
          ))
        }
        <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          searchedUsers?.map((user)=>(
            <tr key={user.id}>
              {
                Object.entries(user).map(([keyName,value],key)=>(
                    <td key={key}>
                      {
                        editable.id==user.id && editable.state && keyName!=='id' ?
                        <input type={['name', 'surname'].includes(keyName) ? "text" : keyName==="email"? "email" : 'number'}
                        className=  {keyName==="name" ? "input-name" : keyName==="surname" ? "input-surname" : keyName==="email" ? "input-email" : 'input-age'}
                        onChange={(e)=>handleChange(e)}
                        value={keyName==="name" ? editName : keyName==="surname" ? editSurname : keyName==="email" ? editEmail : editAge}
                        /> 
                        : value
                      }
                    </td>
                ))
              }
              <td key={user.id}>
                {
                  editable.id==user.id && editable.state ?
                   <>
                    <button className='save-user-edit user-button' onClick={()=>handleUpdate(user.id)}>Save</button>
                    <button onClick={cancelEdit} className='cancel-user-edit user-button'>Cancel</button>
                  </>
                  :
                  <>
                  <button className='edit-user user-button' onClick={()=>handleEditable(user.id,user)}>Edit</button>
                  <button className='delete-user user-button' onClick={()=>handleDelete(user.id)}>Delete</button>
                  </>
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </table> 
    </div>
    </>
  )
}

export default UserTable

