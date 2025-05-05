import { GATEWAY_ENDPOINT } from "../axios.config";


export const bot_api = {
  $_create_bot: (payload: any) => {
    const url = "/account/bot";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_fetch_bots: () => {
    const url = "/account/bot";
    return GATEWAY_ENDPOINT.get(url);
  },
}