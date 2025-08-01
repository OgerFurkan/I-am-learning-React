import React from 'react'
import { FaSortAmountDown,FaSortAmountDownAlt,FaSearch} from "react-icons/fa";

function UserColumnHeader({columnHeaders,sortingType,handleSort}) {
  return (
    <> 
        {
          columnHeaders?.map((head,key)=>(
              <th key={`${key}-${head}`}>
                {head}
                 {
                  sortingType==="asc" ?
                   <FaSortAmountDownAlt className='user-sort-icon' onClick={()=>handleSort(columnHeaders[key])}/> 
                  :
                   <FaSortAmountDown className='user-sort-icon'onClick={()=>handleSort(columnHeaders[key])}/>
                 }
              </th>
          ))
        }
        <th>Actions</th>
    </>
  )
}

export default UserColumnHeader