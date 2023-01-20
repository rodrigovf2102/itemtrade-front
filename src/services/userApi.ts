import { UserWithEmailAndToken, UserWithNoId } from "../protocols";
import api from "./api";

export async function signIn({ email, password }: UserWithNoId) : Promise<UserWithEmailAndToken> {
  const response = await api.post("/users/signin", { email, password });
  return response.data;
};

export async function signUp({ email, password }: UserWithNoId) {
  const response = await api.post("/users/signup", { email, password });
  return response.data;
};
