export default interface UserMovieTable {
  id: string;
  title: string;
  isFavorite: boolean;
  hasEnded: boolean | undefined;
}
