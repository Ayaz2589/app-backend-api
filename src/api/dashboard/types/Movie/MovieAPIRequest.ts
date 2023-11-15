export default interface MovieAPIRequest {
  _id: string;
  titleText: {
    text: string;
  };
  releaseYear: {
    year: number;
  };
  releaseDate: {
    day: number;
    month: number;
    year: number;
  };
  primaryImage: {
    id: string;
    url: string;
  };
  originalTitleText: {
    text: string;
  };
}
