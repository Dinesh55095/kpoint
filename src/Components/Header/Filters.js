import './Filters.css';

function Filters({
    genre,
    activeGenre,
    handleGenreClick,
    handleAllClick
}) {

    return (
        <div className="filters">
            <button className={activeGenre == null ? 'active' : null} onClick={() => handleAllClick(genre.id)}>All</button>
            {genre.map(genre => {
                return (
                    <button className={activeGenre === genre.id ? 'active' : null} key={genre.name} onClick={() => handleGenreClick(genre.id)}>{genre.name}</button>
                )
            })}
        </div>
    )
}

export default Filters;