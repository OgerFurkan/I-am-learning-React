import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesByPage } from '../redux/slices/moviesSlice';
import Movie from '../components/movie';
import "../css/home.css"

function Home() {
    const dispatch=useDispatch();
    const {movies} = useSelector((store)=>store.movies);
    const {status} = useSelector((store)=>store.movies);
    const {error} = useSelector((store)=>store.movies);
    const {favoritesMovies} = useSelector((store)=>store.movies);

    useEffect(()=>{
        if(status=="idle") dispatch(fetchMoviesByPage(1))
    },[])

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
    <div className='movie-container'>
      {
        movies?.map((movie)=>(
          <Movie key={movie.id} movie={movie}/>
        ))
      }
      

    </div>
    </>
    
  )
}
export default Home