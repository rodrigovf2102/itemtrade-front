import { UserWithEmailAndToken, UserWithNoId } from "../protocols";
import api from "./api";

export async function signIn( email : string, password : string) : Promise<UserWithEmailAndToken> {
  const response = await api.post("/users/signin", { email, password });
  return response.data;
};

export async function signUp( email : string, password : string) {
  const response = await api.post("/users/signup", { email, password });
  return response.data;
};
