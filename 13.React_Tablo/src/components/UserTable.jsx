import React, {useState } from 'react'
import {useSelector,useDispatch } from "react-redux"
import "../css/UserTable.css"
import {FaSearch} from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import UserRow from './UserRow';
import UserColumnHeader from './UserColumnHeader';
import AddUserForm from './AddUserForm'
import {searchAnUser } from '../redux/slices/usersSlice';

function UserTable() {
  const dispatch = useDispatch();
  const [sorting,setSorting]=useState({
    key:null,
    type:"asc"
  })
  const [searchValue,setSearchValue]=useState("")
  const {users} = useSelector((store)=>store.users);
  const searchedUsers = useSelector((store)=>store.users.filteredUsers)
  const sortedUsers = React.useMemo(()=>{
    if(!searchedUsers || searchedUsers.length===0) return [];
    if(sorting.key===null) return searchedUsers;
    const sortableUsers= [...searchedUsers];
    sortableUsers.sort((a,b)=>{
      const valA= a[sorting.key]
      const valB= b[sorting.key]
      
        if (typeof valA === 'string' && typeof valB === 'string') {
            return sorting.type==="asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } 
        else{
            return sorting.type==="asc" ? valA - valB : valB - valA;
        } 
    })
    return sortableUsers
      
  },[searchedUsers,sorting.key,sorting.type])
   if(!users || users.length===0 ){
    return(
     <div className='no-users-info'>There are no user!</div> 
    )
  }



  const handleSort=(key)=>{
    setSorting({
      key:key,
      type: sorting.type === "asc" ? "desc" : "asc"
    })
  }
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    dispatch(searchAnUser(e.target.value));
  };


  return (
  <>
    <AddUserForm/>
    <div className="user-search">
      <input type="text" value={searchValue} onChange={handleSearchChange} placeholder='Search Something'/>
        {
          searchValue.length>0 ?  <TiDeleteOutline className='user-delete-icon'
          onClick={()=>{setSearchValue(""),
            dispatch(searchAnUser(""))
          }}/> : <FaSearch className='user-search-icon'/>
        }
    </div>

    <div className='table-wrapper'>
    <table>
      <thead>
        <tr>
          {
            <UserColumnHeader columnHeaders={users.length > 0 ? Object.keys(users[0]) : []} sortingType={sorting.type}
            handleSort={handleSort}/>
          }
        </tr>
      </thead>
      <tbody>
        {
         sortedUsers.length===0 ?(
         <tr>
          <td colSpan={Object.keys(users[0]).length+1} className='no-users-info'>
            No user Found!
          </td>
         </tr>
         ):
            sortedUsers?.map((user)=>(
              <UserRow key={user.id} user={user}/>
            ))
        }
      </tbody>
    </table> 
    </div>
    </>
  )
}

export default UserTable

