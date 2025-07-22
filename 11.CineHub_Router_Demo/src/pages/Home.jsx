import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMoviesByPage } from '../redux/slices/moviesSlice';

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
    <div>

    </div>
  )
}
export default Home