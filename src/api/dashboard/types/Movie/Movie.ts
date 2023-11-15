import { StreamingInformation } from "..";

export default interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  releaseDate: string;
  primaryImage: string;
  originalTitle: string;
  description: string;
  runtimeMinutes: number;
  isFavorite: boolean;
  streaming?: StreamingInformation;
}
