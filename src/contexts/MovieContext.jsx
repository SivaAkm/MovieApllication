import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites");
        
        storedFavs ? setFavorites(JSON.parse(storedFavs)) : [];
    }, [])

    useEffect(() => {
       
        localStorage.setItem("favorites", JSON.stringify(favorites))
       
       
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie])
    }
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const IsFavorite = function (movieId) {
        return (favorites.some(movie => movie.id === movieId))
    }
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        IsFavorite
    }
    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>

}
