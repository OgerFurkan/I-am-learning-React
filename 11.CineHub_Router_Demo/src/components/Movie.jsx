import React from 'react'
import {Link} from "react-router-dom"
import { useSelector,useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { fetchAllGenres,addToFavorites,removeFromFavorites } from '../redux/slices/moviesSlice';
import "../css/movie.css"
import { MdFavoriteBorder,MdFavorite,MdStar} from "react-icons/md";


function movie({movie}) {
    const dispatch=useDispatch();

    const {genre_ids,id,title,overview,poster_path,vote_average} = movie;
 
    const {genres,genreStatus,genreError,favoritesMovies} = useSelector((store)=>store.movies);
    
    const [isFavorite,setIsFavorite] = useState(false)
    
    useEffect(()=>{
        if(genreStatus=="idle") dispatch(fetchAllGenres())
    }, [dispatch, genreStatus])

    const getGenreById = (id) => {
        const foundGenre = genres.find(genre => genre.id === id);
        return foundGenre ? foundGenre.name : "Unknown Genre";
    };

  

    
  return (
    
    <div className='movie-wrapper' >
        <span className="movie-fav">
                {
                isFavorite 
                ? <MdFavorite  style={{color: "#f44531"}} className='fav-icon' onClick={()=>{setIsFavorite(false), dispatch(removeFromFavorites(id))}} /> 
                : <MdFavoriteBorder className='fav-icon' onClick={()=>{setIsFavorite(true), dispatch(addToFavorites(movie))}} />
                }
        </span>
        <Link className='movie-link' to={`/movie-details/${id}`} >
            <img className='movie-poster' src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={title} />
            <div className="movie-infos">
                <p className='movie-title'>
                    <span>{title}</span> - <MdStar className='movie-rate-icon'/>
                    <span className="movie-rate">{Number(vote_average).toFixed(1)}</span>
                </p>
                <p className="movie-genres">
                    {genre_ids?.map((genreId)=>(
                    <span key={genreId}>{getGenreById(genreId)}</span>
                    ))
                    }
                </p>
                <p className="movie-desc">{overview}</p>
            </div>
        </Link>
    </div>   
  )
}

export default movie