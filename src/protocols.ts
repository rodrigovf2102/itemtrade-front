export type UserWithNoId = {
  email: string;
  password: string;
};

export type UserWithNoIdSignUp = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type UserWithEmailAndToken = {
  email: string;
  token: string;
};

export type UserWithEmailTokenAndId = {
  id: number;
  email: string;
  token: string;
};

export type ApplicationError = {
  name: string;
  message: string;
};
