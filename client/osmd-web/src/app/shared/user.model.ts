export class RegUser {
  username: string;
  email: string;
  password: string;
  passwordConf: string;
}

export class User {
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
}
