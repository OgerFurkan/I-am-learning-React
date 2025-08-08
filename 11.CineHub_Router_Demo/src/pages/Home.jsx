import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesByPage} from '../redux/slices/moviesSlice';
import Movie from '../components/movie';
import "../css/home.css"
import { IoIosArrowDroprightCircle,IoIosArrowDropleftCircle } from "react-icons/io";

function Home() {
    const dispatch=useDispatch();
    const {movies,status,error} = useSelector((store)=>store.movies);
    const [page,setPage]=useState(1)
    
    useEffect(()=>{
      dispatch(fetchMoviesByPage(page))
    },[page,dispatch])

    const handlePageNumber=(type)=>{
      if(page === 1 && type==="decrement"){
        setPage(1)
      }
      else if(type==="decrement"){
        setPage(page-1)
      }
      else{
        setPage(page+1)
      }
    }

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

       <div className="home-page-changer">
          <i onClick={()=>handlePageNumber("decrement")}><IoIosArrowDropleftCircle className='page-changer-icon'/></i>
         <span className='page-number before'>{page <= 1 ? " " : page-1}</span>
          <span className='page-number selected'>{page}</span>
          <span className='page-number after'>{page+1}</span>
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
         <span className='page-number before'>{page <= 1 ? " " : page-1}</span>
          <span className='page-number selected'>{page}</span>
          <span className='page-number after'>{page+1}</span>
      <i type='button' onClick={()=>{handlePageNumber("increment"),scrollToTop()}}><IoIosArrowDroprightCircle  className='page-changer-icon'/></i>
    </div>
    </>
    
  )
}
export default Home