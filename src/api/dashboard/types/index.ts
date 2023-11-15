export type { default as User } from "./User/User";
export type { default as UserAPIRequest } from "./User/UserAPIRequest";
export type { default as MovieAPIRequest } from "./Movie/MovieAPIRequest";
export type { default as Movie } from "./Movie/Movie";
export type { default as StreamingInformation } from "./Movie/StreamingInformation";
export type { default as Streaming } from "./Streaming";
export type { default as Login } from "./Streaming/Login";

import { Movie, User } from ".";

export interface JSONObject extends User {
  movies: Movie[];
  streaming: {
    [key: string]: string;
  };
}
