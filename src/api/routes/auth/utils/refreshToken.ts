import jwt from "jsonwebtoken";
import { DBUser } from "../../../../types";

const refreshToken = (user: DBUser) => {
  const refreshToken = jwt.sign(
    { user },
    process.env.REFRESH_TOKEN_SECRET || ""
  );

  return refreshToken;
};

export default refreshToken;
