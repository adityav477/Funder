import jwt from "jsonwebtoken";

const getJwtToken = (data) => {
  const token = jwt.sign({ data });
  return token;
}

export { getJwtToken };

