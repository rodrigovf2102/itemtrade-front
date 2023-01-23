import { Item, ItemWithNoIdNoEnrollId } from "../protocols";
import api from "./api";

export async function getItems(serverId: number, type:string, filter: string) : Promise<Item[]> {
  const response = await api.get(`/items/${serverId}/${type}?filter=${filter}`);
  return response.data;
};

export async function postServer(newItem: ItemWithNoIdNoEnrollId, token: string) : Promise<Item> {
  const response = await api.post("/items", newItem, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

