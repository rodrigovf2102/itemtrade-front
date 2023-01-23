import { ReactNode } from "react";

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

export interface ChildrenProps {
  children: ReactNode;
}

export type Game = {
  id: number,
  name: string,
  gameUrl: string
}

export type GameWithoutId = Omit<Game, "id">;

export type ObjectWithName = {
  name: string
}
