import MovieCard from "../components/MovieCard";
import { useEffect, useState } from "react";
import '../css/HomePage.css'
import { getPopularmovies, searchPopularmovies } from "../Services/API";
function HomePage() {
    const [searchQuery, setsearchQuery] = useState("")
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const Loader = () => (
        <div className="flex flex-col items-center justify-center h-[80vh]">
            <div className="w-12 h-12 border-4 border-black-500 border-t-red-600 rounded-full animate-spin mb-10"></div>
            <p className="text-lg">Camera Rolling...</p>
        </div>
    );

    useEffect(() => {
        const loadPopularmovies = async () => {
            try {
                const popmovies = await getPopularmovies("year=2024");
                setMovies(popmovies);

            }
            catch (err) {
                console.log(err);
                setError("Failed to Render movies...");
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularmovies();
    }, [])
    const Onsearchmovie = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return
        if (loading) return

        setLoading(true);
        const searchrmovies = async () => {
            try {
                const popmovies = await searchPopularmovies(searchQuery);
                setMovies(popmovies);
                setError(null);
            }
            catch (err) {
                console.log(err);
                setError("Failed to search movies...");
            }
            finally {
                setLoading(false)
            }
        }
        searchrmovies();
        // alert("search results" + searchQuery)
        // setsearchQuery("-")
    }
    const [filter, setFilter] = useState({});
      const FilterFields = {
        genre: ["Action", "Drama"],
        startYear: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        sort: ["year.incr", "year.decr"],
        endYear: ["2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
        limit: ["5", "10", "20", "30"]
    }
    const OnchangeFilters = (e) => {
        console.log("filters Changed" + e.target.id);
        const idkey = e.target.id;
        const value = e.target.value;
       
            setFilter(prev => ({
                ...prev,
                [idkey]: value
            }))
        

    }

    const onApplyFilter = (e) => {
        e.preventDefault();
        let addapiurl = "year=2024"
        if (e.target.id === "ApplyFilter") addapiurl = Object.entries(filter).map(([key, value]) => `&${key}=${value}`).join("");
        setLoading(true);
        console.log(addapiurl);
        



        const filterrmovies = async () => {
            try {
                const Filtermovies = await getPopularmovies(addapiurl);
                setMovies(Filtermovies);
                setError(null);
            }
            catch (err) {
                console.log(err);
                setError("Failed to search movies...");
            }
            finally {
                setLoading(false)
            }
        }
        filterrmovies();
    }
    const [showFilters, setShowFilters] = useState(false);
    return (
        <>

            <div className="text-white mb-0" onChange={OnchangeFilters}>
                <button
                    className="bg-white text-red-700 font-bold py-2 px-4 rounded mb-0"
                    onClick={() => setShowFilters(prev => !prev)}
                >
                    Preferences {showFilters ? "▲" : "▼"}
                </button>
                {showFilters && (
                    <div className="flex flex-wrap gap-20 text-red-700 font-bold">

                        {Object.entries(FilterFields).map(([key, values]) => {
                            return (<div key={key} className="flex flex-col min-w-[140px]">
                                <label htmlFor={key} className="text-sm mb-1 capitalize ">{key}</label>
                                <select className="text-black p-1 rounded border border-gray-300" name={key} id={key}>
                                    <option value="">--Select--</option>
                                    {values.map((category, index) => {
                                        return <option key={index} value={category}>{category}</option>
                                    })}
                                </select></div>)
                        })}
                        <div className="flex flex-col justify-end gap-2">
                            <button type="button" className="bg-white text-red-700 border-black px-4 py-2 rounded shadow" id="ApplyFilter" onClick={onApplyFilter}>Apply Filter</button>
                            <button type="button" className="bg-red-700 border border-white px-4 py-2 rounded text-white" id="ClearFilter" onClick={onApplyFilter}>Clear Filter</button>
                        </div>
                    </div>)}
            </div>
            <div className="home">
                <form className="search-form" onSubmit={Onsearchmovie}>
                    <input type="text" placeholder="Search here for Movies"
                        className="Search-box" value={searchQuery}
                        onChange={(e) => { setsearchQuery(e.target.value) }}
                    ></input>
                    <button className="search-button" type="submit">Search</button>
                </form>
                {error && <div className="error-message">{error}</div>}
                {loading ? <Loader /> : <div className="Movie-grid">
                    {movies.map((movie) => (
                        <MovieCard MovieDetails={movie} key={movie.id} />))}
                </div>}

            </div>
        </>
    );
}
export default HomePage;