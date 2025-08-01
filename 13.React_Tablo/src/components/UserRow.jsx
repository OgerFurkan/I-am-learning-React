import React, {useState } from 'react'
import {useDispatch } from "react-redux"
import { deleteUserById, updateUser,searchAnUser } from '../redux/slices/usersSlice';

function UserRow({user}) {
  const dispatch=useDispatch();
  const [isEditing,setIsEditing]=useState(false)
  const [editedUser,setEditedUser]=useState(user)
 

  const handleChange = (keyName,e)=>{
   setEditedUser({
    ...editedUser,
    [keyName]:e.target.value
   })
  }
  const handleEditable = (id,user)=>{
    setIsEditing(!isEditing)
  }
  const cancelEdit =()=>{
    setIsEditing(!isEditing)
    setEditedUser(user)
  }
  const handleUpdate=(id)=>{
    dispatch(updateUser(editedUser))
    console.log("The user has been updated: ",`'${user.id} - ${user.name} ${user.surname}'`)
    setIsEditing(false)
  }
  const handleDelete=(id)=>{
    dispatch(deleteUserById(id))
    console.log("The user has been deleted: ",`'${user.id} - ${user.name} ${user.surname}'`)
  }

  return (
    <tr key={user.id}>
            {
                Object.entries(user)?.map(([keyName,val])=>(
                    <td key={`${user.id}-${keyName}`}>
                        {
                            isEditing && keyName!=="id" ? <input type={
                                keyName==="email" ? "email" : keyName==="age" ? "number" : "text"
                            } className={`input-${keyName}`} value={editedUser[keyName]} onChange={(e)=>handleChange(keyName,e)}/> : val
                        }
                    </td>
                    )
                )
            }
                <td key={user.id}>
                  {
                    isEditing ?
                    <>
                      <button className='save-user-edit user-button' onClick={()=>handleUpdate(user.id)}>Save</button>
                      <button onClick={cancelEdit} className='cancel-user-edit user-button'>Cancel</button>
                    </>
                    :
                    <>
                    <button className='edit-user user-button' onClick={handleEditable}>Edit</button>
                    <button className='delete-user user-button' onClick={()=>handleDelete(user.id)}>Delete</button>
                    </>
                  }
                </td>
    </tr>
  )
}

export default UserRow