export class Profile {
  _id: string;
  local: {
    username: string,
    email: string,
    confirmed: boolean
  };
  google: {
    name: string;
    email: string;
  };
  role: string[];
  createdAt: Date;
  updatedAt: Date;

}
