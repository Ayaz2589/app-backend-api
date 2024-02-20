import jwt from "jsonwebtoken";
import { DBUser } from "../../../../types";

const generateToken = (user: DBUser) => {
  const accessToken = jwt.sign(
    { user },
    process.env.ACCESS_TOKEN_SECRET || "",
    {
      expiresIn: "1h",
    }
  );

  return accessToken;
};

export default generateToken;
