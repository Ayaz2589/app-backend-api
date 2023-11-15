import { Movie, Login } from "..";

export default interface Streaming {
  member_since: string | Date;
  login_history: Login[];
  streaming_plan: string;
  is_active: boolean;
  streaming_quality: string;
  streaming_device: string[];
  streaming_language: string;
  streaming_watch_history: Movie[] | null;
}
