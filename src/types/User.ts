interface User {
  user: {
    id: number;
    email: string;
    password: string;
    createdAt?: string;
  };
  iat: number;
}

export default User;
