import React, {useState } from 'react'
import {useDispatch } from "react-redux"
import { deleteUserById, updateUser } from '../redux/slices/usersSlice';
import BaseModal from '../modal/BaseModal';

function UserRow({user}) {
  const dispatch=useDispatch();
  const [isEditing,setIsEditing]=useState(false)
  const [editedUser,setEditedUser]=useState(user)

  const [isModalOpen,setIsModelOpen]=useState(false)
  const closeModal=()=>setIsModelOpen(false)
  const openModal=()=>setIsModelOpen(true)  
 

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
    <>
      <BaseModal isOpen={isModalOpen} onClose={closeModal} >
        <div className="user-delete-confirmation-modal">
          <h3>Are you sure you want to delete the user?</h3>
          <div className="button-wrapper">
         <button className='confirm-delete-button user-button' onClick={()=>{handleDelete(user.id),closeModal()}}>Yes</button>
            <button className='cancel-delete-button user-button' onClick={closeModal}>No</button>
          </div>
          
        </div>
      </BaseModal>
     
      <tr key={user.id}>
        {
          Object.entries(user)?.map(([keyName,val])=>(
            <td key={`${user.id}-${keyName}`}>
                {
                  isEditing && keyName!=="id" ? <input 
                  type={keyName==="email" ? "email" : keyName==="age" ? "number" : "text"} className={`input-${keyName}`} 
                  value={editedUser[keyName]} 
                  onChange={(e)=>handleChange(keyName,e)}/>
                  : val
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
                  <button className='delete-user user-button' onClick={openModal}>Delete</button>
                </>
                }
            </td>
      </tr>
    </>
  )
}

export default UserRow