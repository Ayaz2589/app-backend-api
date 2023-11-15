import { Movie, User, WatchedMovie } from "../types";

const getHighestWatchedMovies = (movies: Movie[], users: User[]) => {
  if (!movies?.length || !users?.length) return null;

  const movieCache: WatchedMovie = movies.reduce((acc, movie) => {
    if (!acc[movie.id]) {
      return {
        ...acc,
        [movie.id]: { count: 0, title: movie.title, image: movie.primaryImage },
      };
    }
    return acc;
  }, {} as WatchedMovie);

  const watchedMovies = users.map((user) => {
    return user.watchedMovies?.map((movie) => {
      return movie.id;
    });
  });

  watchedMovies.flat().forEach((movieId) => {
    if (movieId) {
      movieCache[movieId].count += 1;
    }
  });

  return Object.entries(movieCache).sort(
    (movieA, movieB) => movieB[1].count - movieA[1].count
  );
};

export default getHighestWatchedMovies;
