import { User, UserAPIRequest } from "../types";

const url = "https://dummyjson.com/users";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

const createPersonalInformation = async () => {
  try {
    const response = await fetch(url, options);
    const { users } = await response.json();
    if (response.ok && users?.length) {
      const formattedUserObjectArray: User[] = users.map(
        (user: UserAPIRequest) => createUser(user)
      );
      return formattedUserObjectArray;
    }
  } catch (error) {
    console.log(error);
  }
};

export default createPersonalInformation;

const randomBool = () => (Math.random() > 0.5 ? true : false);

const createUser = (user: UserAPIRequest): User => ({
  watchedMovies: undefined,
  isAccountActive: randomBool(),
  billingAddress: {
    value: user.address.address,
    city: user.address.city,
    coordinates: user.address.coordinates,
    postalCode: user.address.postalCode,
    state: user.address.state,
  },
  personal_information: {
    firstName: user.firstName,
    lastName: user.lastName,
    fullName: `${user.firstName} ${user.lastName}`,
    gender: user.gender,
    birthDate: user.birthDate,
  },
  system: {
    ipAddress: user.ip,
    macAddress: user.macAddress,
    userAgent: user.userAgent,
  },
  bankInformation: {
    cardExpire: user.bank.cardExpire,
    cardNumber: user.bank.cardNumber,
    cardType: user.bank.cardType,
    currency: user.bank.currency,
    iban: user.bank.iban,
  },
  email: user.email,
  phone: user.phone,
  username: user.username,
  avatar: user.image,
  id: user.id,
});
