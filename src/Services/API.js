const SearchAPI_KEY ="39c3caed";
const SearchAPI_URL ="http://www.omdbapi.com/?";
const GetAPI_URL = 'https://moviesdatabase.p.rapidapi.com/titles?';
const GetAPiHeaders = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'f64d785ad2msh5fd086d073fa436p1e2637jsn0095e286de71',
		'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
	}
};
//http://www.omdbapi.com/?i=tt3896198&apikey=39c3caed
//http://www.omdbapi.com/?t=lfdlldf

export const getPopularmovies = async(API_Filters) =>{
    const response = await fetch(GetAPI_URL+API_Filters,GetAPiHeaders)
    const data = await response.json();
    const movieArr = data.results;
   
    const movieobj = [];
    movieArr.map((movie,index)=>{
        movieobj.push({id:++index,title : movie.originalTitleText.text,imagedata : movie.primaryImage,year : movie.releaseYear.year});
       
    })
    return movieobj;
}

export const searchPopularmovies = async(SearchQuery) =>{
    const response = await fetch(`${SearchAPI_URL}t=${SearchQuery}&apikey=${SearchAPI_KEY}`)
    const data = await response.json();
 
    const movieobj = [];
    movieobj.push({id:1,title : data.Title,imagedata :{ url:data.Poster} , year:data.Year});
    console.log(movieobj);
    return movieobj;

}