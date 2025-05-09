import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';
function Favorites(){
    const {favorites} = useMovieContext();
    
    if(favorites.length !== 0){
        return(
        <>
        <div className='favorites'>
            <h3> Favourite Flims are here !!</h3>
             <div className="Movie-grid">
                {favorites.map((movie) => (
                <MovieCard MovieDetails={movie} key={movie.id} />))}
            </div>
        </div>
        </>
        )
    }
return(
    <>
    <div>
        <h3>Yupp No Favorites Added yet !!</h3>
        <p>Start Adding Favorites</p>
    </div>
    </>
)
}

export default Favorites;