import { useEffect, useState } from "react";
import { BASE_URL, API_KEY } from './Constants';
import Header from './Components/Header/Header';
import Movies from './Components/Movies/Movies';
import Loader from "./Components/UI/Loader";

import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [activeGenre, setActiveGenre] = useState(null);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    async function fetchMoviesData() {
      try {
        let allMovies = [];
        const startYear = 2012;
        const currentYear = new Date().getFullYear();
        for (let year = startYear; year <= currentYear; year++) {
          const res = await fetch(`${BASE_URL}/discover/movie?${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&vote_count.gte=100&limit=20`);
          if (!res.ok) {
            throw new Error('Failed to fetch movies list');
          }
          const data = await res.json();
          allMovies = [...allMovies, { year, movies: data.results }];
        }
        setMovies(allMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error fetch movie:', error);
        setLoading(false);
      }
    }
    fetchMoviesData();
  }, []);

  useEffect(() => {
    async function fetchGenreData() {
      try {
        const res = await fetch(`${BASE_URL}/genre/movie/list?${API_KEY}`);
        if (!res.ok) {
          throw new Error('Failed to fetch genre list');
        }
        const data = await res.json();
        setGenre(data.genres);
      } catch (error) {
        console.error('Error fetch genres:', error);
      }
    }
    fetchGenreData();
  }, []);
  const handleGenreClick = (genreId) => {
    setActiveGenre(genreId);
  };

  const handleAllClick = () => {
    setActiveGenre(null);
  };

  return (
    <div className="App">
      <Header
        genre={genre}
        activeGenre={activeGenre}
        showFilters={showFilters}
        handleGenreClick={handleGenreClick}
        handleAllClick={handleAllClick}
      />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Movies movies={movies} activeGenre={activeGenre} setShowFilters={setShowFilters} />
        </>
      )}
    </div>
  );
}

export default App;
