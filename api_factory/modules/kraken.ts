import { GATEWAY_ENDPOINT } from "../axios.config";


export const kraken_api = {
  $_fetch_balance: () => {
    const url = "/account/kraken/balance";
    return GATEWAY_ENDPOINT.get(url);
  },
}