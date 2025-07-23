import React from 'react'
import "../css/header.css"
import { Link } from 'react-router-dom'
import { FaHeart } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import{useSelector} from "react-redux"

function header() {

  const {favoritesMovies} = useSelector((store)=> store.movies)

  return (
    <header>    
        <Link to={"/"}> <img src="/images/cinehub_178-60.png"  alt="logo" id="logo"/></Link>
        <div className="nav-search">
          <input type="text" id="search-input" placeholder='Search' />
          <label htmlFor="search-input">
            <CiSearch className='nav-search-icon'/>
          </label>
        </div>
        <ul className="nav">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/movies"}>Movies</Link></li>
            <li><Link to={"/favorites"}><FaHeart /><span className='count-favs'>{favoritesMovies.length}</span></Link></li>
        </ul>
    </header>
  )
}

export default header