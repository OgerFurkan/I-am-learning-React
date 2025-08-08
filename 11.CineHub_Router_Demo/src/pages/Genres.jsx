import React, { useEffect,useState } from 'react'
import "../css/genres.css"
import { Helmet } from 'react-helmet-async';
import {useDispatch, useSelector} from "react-redux"
import { addtoGenres,removeFromGenres, fetchAllGenres, fetchMoviesByGenre } from '../redux/slices/genreSlice';
import Movie from "../components/Movie"
import { IoIosArrowDroprightCircle,IoIosArrowDropleftCircle } from "react-icons/io";


function Genres() {
  let pageTitle = "Cinehub - Genres"
  const dispatch = useDispatch();
  const [page,setPage]=useState(1)
  const [customPageNumber,SetCustomPageNumber]=useState(page)
  const [isCustomPageNumber,SetIsCustomPageNumber]=useState(false)
  const {genres,genreStatus,moviesByGenre,selectedGenres} = useSelector((store)=>store.genres)
 
  useEffect(()=>{
    dispatch(fetchAllGenres())
  },[dispatch, genreStatus])

  useEffect(()=>{
    if(selectedGenres.length>0){
      dispatch(fetchMoviesByGenre({genres:selectedGenres,page:page}))
      SetCustomPageNumber(page)
    }
    else{
      dispatch(addtoGenres(28))
      setPage(1)
    }
    console.log("movies",moviesByGenre)
    console.log("genres",selectedGenres)
  },[selectedGenres,dispatch,page])

  const handleSelectGenre=(e,id)=>{
   if(selectedGenres.length>=3){
      if(e.target.className.includes("selected")){
        e.target.className="genre"
        dispatch(removeFromGenres(id))
      }
      return
   }
   else if(e.target.className.includes("selected")){
      e.target.className="genre"
      dispatch(removeFromGenres(id))
   }
   else{
      e.target.className = e.target.className+" selected"
      dispatch(addtoGenres(id))
   }
  }
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
    <Helmet>
        <title>{pageTitle}</title>
    </Helmet>

    <div className="genres-container"> 
      <div className="genre-title">
         {
          genres?.map((genre)=>(
            <div key={genre.id} className={selectedGenres.includes(genre.id) ? "genre selected" : "genre"} 
            onClick={(e)=>handleSelectGenre(e,genre.id)}
            >{genre.name}</div>
          ))
        }
      </div>
      <div className="genres-movies-container">
        <h1 className='genre-info-title'>Please select up to 3 Genres.</h1>
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
        <div className='genre-movies'>
          {
          moviesByGenre.map((movie)=>(
            <Movie key={movie.id} movie={movie}></Movie>
          ))
        }
        </div>
         <div className="home-page-changer">
            <i onClick={()=>{handlePageNumber("decrement"),scrollToTop()}}><IoIosArrowDropleftCircle className='page-changer-icon'/></i>
            <span className='page-number unselected'>{page <= 1 ? "-" :Number(page)-1}</span>
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
      </div>
    </div>
  </>
  )
}

export default Genres