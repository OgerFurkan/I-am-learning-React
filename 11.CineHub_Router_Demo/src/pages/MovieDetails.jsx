import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

function MovieDetails() {
    const params= useParams()
    const {id} = params;

    const {movies} = useSelector((store)=>store.movies)
    

  return (
    <div>MovieDetails</div>
  )
}

export default MovieDetails