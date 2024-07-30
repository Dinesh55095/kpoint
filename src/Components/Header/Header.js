import Filters from "./Filters";
import './Header.css';

function Header({
    genre,
    activeGenre,
    movies,
    setFilteredMovies,
    handleGenreClick,
    handleAllClick,
    showFilters
}) {
    return (
        <header>
            <div className='logo'>
                <h1>MOVIEFIX</h1>
            </div>
            {showFilters &&
                < Filters
                    genre={genre}
                    activeGenre={activeGenre}
                    movies={movies}
                    setFilteredMovies={setFilteredMovies}
                    handleGenreClick={handleGenreClick}
                    handleAllClick={handleAllClick}
                />}
        </header>
    )
}

export default Header;