import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import "../css/movie-details.css"
import { fetchMovieById, fetchMovieVideoById } from '../redux/slices/movieDetailsSlice';
import {fetchAllGenres} from "../redux/slices/genreSlice"
import { MdStar} from "react-icons/md";


function MovieDetails() {
    const dispatch = useDispatch()
    const params= useParams()
    const {id:movieId} = params;

    const {movie,status,error,key} = useSelector((store)=>store.movieDetails)

    const {genres:genreTitles,status:genreStatus,error:genreError} = useSelector((store)=>store.genres);

    const {backdrop_path,poster_path, genres,title,relase_date,vote_average,overview} = movie


    useEffect(()=>{
        dispatch(fetchMovieById(movieId))
        dispatch(fetchMovieVideoById(movieId))
    },[dispatch,movieId])

    useEffect(()=>{
      if(genreStatus==="idle")dispatch(fetchAllGenres())
    }, [dispatch, genreStatus])

    const getGenreById = (id) => {
      const foundGenre = genreTitles.find(genre => genre.id === id);
      return foundGenre ? foundGenre.name : "Unknown Genre";
    };

  return (
    <>
    <img className='movie-details-backdrop' src={`https://image.tmdb.org/t/p/original/${backdrop_path}`} alt={title} />
    <div className='movie-details-wrapper'>
    <img className='movie-details-poster' src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
    <div className="movie-details-info">
      <div className="movie-details-title">
        <p>{title}</p>
        -
        <p>
          <MdStar/> {Number(vote_average).toFixed(1)}
        </p>
      </div>
      <div className="movie-details-genres">
        {
          genres?.map((genreId)=>(
            <span key={`${genreId.id}-${movieId}`}>{getGenreById(genreId.id)}</span>
          ))
        }
      </div>
          {
            key ? 
            <iframe className='movie-details-trailer'  
            src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1`}
            style={{ border: "0" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>:
          <div className="movie-details-no-trailer">
            Trailer Not founded
          </div>
          }
        <p className="movie-details-desc">
          {overview}
        </p>

      
    </div>

    </div>
  </>
  )
}

export default MovieDetails