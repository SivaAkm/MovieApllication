import { useMovieContext } from '../contexts/MovieContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import '../css/MovieCard.css'

function MovieCard({ MovieDetails }) {
    const { favorites, addToFavorites, removeFromFavorites, IsFavorite } = useMovieContext();
    const favorite = IsFavorite(MovieDetails.id)

    const fallbackImage = '/JetFlixLogo.png';

    const handleError = (e) => {
        e.target.onerror = null; // prevent infinite loop
        e.target.src = fallbackImage;
      };

    function OnclickFav(e) {
        e.preventDefault();
        favorite ? removeFromFavorites(MovieDetails.id) : addToFavorites(MovieDetails);
    }
  
    return (
        <>
            <div className="Movie-card">
                <div className="Movie-poster">
                    <LazyLoadImage 
                        effect="blur"
                        onError={handleError}
                        className="Movie-image"
                        placeholderSrc="/JetFlixLogo.png"
                        loading="lazy" src={MovieDetails.imagedata?.url ||MovieDetails.title}
                        alt={MovieDetails.title} />
                    <div className="Movie-Overlay">
                        <button className={`Favorite-Button ${favorite ? "active" : ""}`} onClick={OnclickFav}>💗</button>
                    </div>
                </div>
                <div className="Movie-Info">
                    <h3>{MovieDetails.title}</h3>
                    <p>{MovieDetails.year}</p>
                </div>
            </div>
        </>
    );

}
export default MovieCard;