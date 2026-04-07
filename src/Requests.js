const API_KEY = "bf104ede938ffce9643cfc6e25cf3df3";

const requests = {
    trending: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`,
    topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`,
    action: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`,
    comedy: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`,
    horror: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`,
    romance: `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`,
};

export default requests;