import { User, UserTable } from "../types";

const formatUsersForTable = (users: User[]): UserTable[] => {
  if (!users) return [];
  const data = users.map((user) => {
    return {
      id: user.id,
      name: user.personal_information.fullName,
      email: user.email,
      username: user.username,
      active: user.isAccountActive,
    };
  });

  return data;
};

export default formatUsersForTable;
