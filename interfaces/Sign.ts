interface ISign {
  id: string;
  email: string;
  username: string;
  description: string;
  photo: null;
  token: string;
  rooms: [];
}

interface IUser extends Omit<ISign, "token" | "rooms"> {}

export default ISign;
export { IUser };
