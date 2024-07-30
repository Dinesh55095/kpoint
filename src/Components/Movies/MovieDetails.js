import { useState, useEffect } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import placeholderImage from '../../placeholder_image.gif';
import Loader from '../UI/Loader'
import CastList from "./CastList";
import './MovieDetails.css';
import { BASE_URL, API_KEY } from '../../Constants';

function MovieDetails({
    selectedMovie,
    onClose
}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    console.log('movie', movie)

    useEffect(() => {
        const fetchMovieDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/movie/${selectedMovie}?${API_KEY}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMovieDetails();
    }, [selectedMovie]);

    const {
        title,
        backdrop_path: poster,
        genres,
        overview,
        runtime,
        vote_average: imdbRating,
        release_date: releaseDate,
        spoken_languages: languages
    } = movie;

    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;

    const posterImage = `https://image.tmdb.org/t/p/w500/${poster}`;

    return (

        <div className="movie-details-wrapper">
            {isLoading ? <Loader /> : (
                <>
                    <div className="poster">
                        <div onClick={onClose} className="back-button"><span>&larr;</span></div>
                        <LazyLoadImage
                            src={posterImage}
                            alt={title}
                            placeholderSrc={placeholderImage}
                        />
                    </div>
                    <div className="movie-details">
                        <div className="movie-desc-header">
                            <h2 className="title">{title}</h2>
                            <div className="d-flex">
                                <p>{releaseDate}</p>&bull;
                                <p>{hours}h {minutes}m</p>&bull;
                                <p>⭐IMDb Rating: {parseFloat(imdbRating).toFixed(1)}</p>
                            </div>
                        </div>
                        <div className="movie-detailed-info">
                            {overview && <p>{overview}</p>}
                            <p><strong>Language:</strong> {languages && languages.map(language => language.name).join(', ')}</p>
                            <p><strong>Genres:</strong> {genres && genres.map(genre => genre.name).join(', ')}</p>
                            <CastList selectedMovie={selectedMovie} />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default MovieDetails;