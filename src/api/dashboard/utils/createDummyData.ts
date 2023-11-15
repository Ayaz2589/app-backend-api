import { Movie, User, JSONObject, StreamingInformation } from "../types";
import { createPersonalInformation, createMovieDetailsInformation } from "..";

const getRandomItemdFromArray = (inputArray: Movie[]) => {
  const newArray = [];

  const randomItemCount = Math.floor(Math.random() * inputArray.length) + 1;
  const shuffledArray = inputArray.slice().sort(() => Math.random() - 0.5);

  for (let i = 0; i < randomItemCount; i++) {
    newArray.push(shuffledArray[i]);
  }

  return newArray;
};

const randomBool = () => (Math.random() > 0.5 ? true : false);

const generateStreamingInformation = (
  runTime: number
): StreamingInformation => {
  const hasStarted = true;
  const hasEnded = randomBool();

  if (!hasEnded && hasStarted) {
    const randomMinutes = Math.floor(Math.random() * (runTime - 1) + 1);
    return { hasStarted, hasEnded, minutesWatched: randomMinutes };
  }

  return { hasStarted, hasEnded, minutesWatched: runTime };
};

const createDummyData = async () => {
  const users = await createPersonalInformation();
  const movies = await createMovieDetailsInformation();

  if (users?.length !== 30 && movies?.length !== 30) {
    throw new Error("Error creating dummy data");
  }

  if (users?.length && movies?.length) {
    const objectToReturn = users?.reduce<User[]>((accum, value) => {
      const watchedMovies = getRandomItemdFromArray(movies).map((movie) => {
        const runtimeMinutes = movie.runtimeMinutes;
        const streamingInformation: StreamingInformation =
          generateStreamingInformation(runtimeMinutes);
        return {
          ...movie,
          streaming: streamingInformation,
        };
      });
      return [
        ...accum,
        {
          ...value,
          watchedMovies,
        },
      ];
    }, [] as JSONObject[]);

    return JSON.stringify({ users: objectToReturn, movies });
  }

  return "[]";
};

export default createDummyData;
