import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesByPage} from '../redux/slices/moviesSlice';
import Movie from '../components/Movie';
import "../css/home.css"
import { IoIosArrowDroprightCircle,IoIosArrowDropleftCircle } from "react-icons/io";

function Home() {
    const dispatch=useDispatch();
    const {movies,status,error} = useSelector((store)=>store.movies);
    const [page,setPage]=useState(1)
    const [customPageNumber,SetCustomPageNumber]=useState(page)
    const [isCustomPageNumber,SetIsCustomPageNumber]=useState(false)
    
    useEffect(()=>{
      dispatch(fetchMoviesByPage(page))
      SetCustomPageNumber(page)
    },[page,dispatch])

    const handlePageNumber=(type)=>{
      if(page === 1 && type==="decrement"){
        setPage(1)
      }
      else if(type==="decrement"){
        setPage(Number(page)-1)
      }
      else{
        setPage(Number(page)+1)
      }
    }
    const handlePageBlur=()=>{
      const value = Number(customPageNumber)
      if(!isNaN(value) && value>0 ){
        setPage(value)
        SetIsCustomPageNumber(!isCustomPageNumber)
      }
      else{
        setPage(1)
        SetCustomPageNumber(page)
        SetIsCustomPageNumber(!isCustomPageNumber)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Enter'){
        handlePageBlur();
        scrollToTop()
      }
      
    };

    const scrollToTop = () => {
        window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    };
  return (
  <>
    <div className='home-main-title'>
      <div className="home-left-title">
        <img className='logo' src="/images/Logo.png" alt="" />
        <div className='header-title'>
        <h1 className='header-1'>THE MOST</h1>
        <h1 className='header-2'>POPULAR</h1>
        <h1 className='header-3'>MOVIES</h1>
      </div>
      </div>
       <img className='logo-name' src="/images/logo-name.png" alt="" />
    </div>
    {
      status==="succeeded"
      ? 
      <>
        <div className="home-page-changer">
            <i onClick={()=>handlePageNumber("decrement")}><IoIosArrowDropleftCircle className='page-changer-icon'/></i>
            <span className='page-number unselected'>{page <= 1 ? "-" : Number(page)-1}</span>
            {
              isCustomPageNumber
              ?
              <input  className="home-page-number-input"  type="number" min={1} value={customPageNumber} onChange={(e)=>SetCustomPageNumber(e.target.value)} onBlur={()=>handlePageBlur()} onKeyDown={(e)=>handleKeyDown(e)}/>
              : 
              <span title='Click for enter a page number' className='page-number selected' onClick={()=>SetIsCustomPageNumber(!isCustomPageNumber)}>{page}</span>
            }
            <span className='page-number unselected'>{Number(page)+1}</span>
            <i onClick={()=>handlePageNumber("increment")}><IoIosArrowDroprightCircle className='page-changer-icon'/></i>
        </div>
        <div className='movie-container'>
          {
            movies?.map((movie)=>(
              <Movie key={movie.id} movie={movie}/>
            ))
          }
        </div>
        <div className="home-page-changer">
            <i onClick={()=>{handlePageNumber("decrement"),scrollToTop()}}><IoIosArrowDropleftCircle className='page-changer-icon'/></i>
            <span className='page-number unselected'>{page <= 1 ? "-"  :Number(page)-1}</span>
              {
              isCustomPageNumber
              ?
              <input className="home-page-number-input" type="number" min={1} value={customPageNumber} onChange={(e)=>SetCustomPageNumber(e.target.value)} onBlur={()=>handlePageBlur()} onKeyDown={(e)=>handleKeyDown(e)}/>
              : 
              <span title='Click for enter a page number' className='page-number selected' onClick={()=>SetIsCustomPageNumber(!isCustomPageNumber)}>{page}</span>
            }
              <span className='page-number unselected'>{Number(page)+1}</span>
          <i type='button' onClick={()=>{handlePageNumber("increment"),scrollToTop()}}><IoIosArrowDroprightCircle  className='page-changer-icon'/></i>
        </div>
      </>
      : 
        <div className='movie-container'>
          <div className="loader-wrapper">
            <div className="loader-logo">
              <img className='logo-name' src="/images/Logo.png" alt="" />
            </div>
            <div className="loader-ring"></div>
          </div>
        </div>
    }
       
  </>
    
  )
}
export default Home