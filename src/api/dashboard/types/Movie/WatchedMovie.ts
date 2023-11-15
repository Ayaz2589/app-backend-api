export default interface WatchedMovie {
  [key: string]: {
    count: number;
    title: string;
    image: string;
  };
}
