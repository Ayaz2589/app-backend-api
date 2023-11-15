import { Movie, UserMovieTable } from "../types";

const formatUserMoviesForTable = (movies: Movie[]): UserMovieTable[] => {
  if (!movies) return [];
  const data = movies.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      isFavorite: movie.isFavorite,
      hasEnded: movie.streaming?.hasEnded,
    };
  });

  return data;
};

export default formatUserMoviesForTable;
