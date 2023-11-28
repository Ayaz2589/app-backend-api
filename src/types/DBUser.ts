import { Types } from "mongoose";

interface DBUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  createdAt?: string;
}

export default DBUser;
