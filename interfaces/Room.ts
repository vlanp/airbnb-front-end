interface IRoom {
  _id: string;
  title: string;
  description: string;
  price: number;
  ratingValue: number;
  reviews: number;
  photos: Array<IPicture>;
  location: [number, number];
  user: IUser;
  __v: number;
}

interface IPicture {
  url: string;
  picture_id: string;
}

interface IUser {
  account: IAccount;
  id: string;
  rooms: Array<string>;
  __v: number;
}

interface IAccount {
  username: string;
  description: string;
  photo: IPicture;
}

export default IRoom;
