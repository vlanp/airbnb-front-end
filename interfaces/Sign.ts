interface ISign {
  id: string;
  email: string;
  username: string;
  description: string;
  photo: IPhoto | null;
  token: string;
  rooms: [];
}

interface IPhoto {
  url: string;
  id: string;
  name: string;
  type: null;
}

interface IUser extends Omit<ISign, "token" | "rooms"> {}

interface IUpdateUser extends Omit<ISign, "token"> {}

export default ISign;
export { IUser, IUpdateUser, IPhoto };
