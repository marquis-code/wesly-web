import { GATEWAY_ENDPOINT } from "../axios.config";


export const exchanges_api = {
  $_fetch_exchanges: () => {
    const url = "/account/exchanges";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_connect_to_exchange: (payload: any) => {
    const url = "/account/exchanges";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_fetch_connected_exchanges: () => {
    const url = "/account/exchanges";
    return GATEWAY_ENDPOINT.get(url);
  },
}