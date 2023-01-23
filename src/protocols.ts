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

export type Server = {
  id: number,
  gameId: number,
  name: string
}

export type ServerWithNoId = Omit<Server, "id">

export type ServerWithGame = {
  Game: Game,
  id: number,
  gameId: number,
  name: string
}

export type ServerNoIdName = {
  name: string,
  gameName: string
}

export type Item = {
  id: number,
  name: string,
  price: number,
  amount: number,
  itemUrl: number,
  serverId: number,
  enrollmentId: number,
  itemType: string
};

export type ItemWithNoIdNoEnrollId = Omit<Item, "id" | "enrollmentId">
