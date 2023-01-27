import useAsync from "../useAsync";
import * as tradeApi from "../../services/tradesApi";
import { Trade, TradeWithEnrollsItem } from "../../protocols";
import useToken from "../useToken";

export default function useTrades() {
  const token = useToken();
  const {
    data: trades,
    loading: tradesLoading,
    error: tradesError,
    act: getTrades
  } = useAsync((data : string) => tradeApi.getTrades(data, token), false);

  return {
    trades,
    tradesLoading,
    tradesError,
    getTrades
  } as unknown as UseTrades;
}

type UseTrades = {
  trades: TradeWithEnrollsItem[],
  tradesLoading: boolean,
  tradesError: any,
  getTrades(tradeType: string, token: string) : Promise<TradeWithEnrollsItem[]>
}
