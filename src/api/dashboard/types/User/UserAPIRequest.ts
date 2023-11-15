export default interface UserAPIRequest {
  address: {
    address: string;
    city: string;
    coordinates: string;
    postalCode: string;
    state: string;
  };
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: string;
  ip: string;
  macAddress: string;
  userAgent: string;
  email: string;
  phone: string;
  username: string;
  image: string;
  id: number;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
}
