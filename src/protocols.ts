import { ReactNode } from "react";

export type Game = {
  id: number,
  name: string,
  gameUrl: string
}

export type Server = {
  id: number,
  gameId: number,
  name: string
}

export type Item = {
  id: number,
  name: string,
  price: number,
  amount: number,
  itemUrl: string,
  serverId: number,
  enrollmentId: number,
  gameId: number,
  itemType: string
};

export type Enrollment = {
  id: number,
  name: string,
  CPF: string,
  userId: number,
  balance: number,
  enrollmentUrl: string  
}

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

export type GameWithoutId = Omit<Game, "id">;

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

export type ItemWithNoIdNoEnrollId = Omit<Item, "id" | "enrollmentId">

export type ItemNoIdNoEnrollIdNoGameIdNoServerIdServerName = {
  name: string,
  price: number,
  amount: number,
  itemUrl: string,
  gameName: string,
  serverName: string,
  itemType: string
} 

export type ItemWithGameServerEnroll = {
  id: number,
  name: string,
  price: number,
  amount: number,
  itemUrl: string,
  serverId: number,
  enrollmentId: number,
  gameId: number,
  itemType: string,
  Game: Game,
  Server: Server,
  Enrollment: Enrollment
}

export type ApplicationError = {
  name: string;
  message: string;
};

export interface ChildrenProps {
  children: ReactNode;
}

export type ObjectWithName = {
  name: string
}
