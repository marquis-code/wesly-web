import { GATEWAY_ENDPOINT } from "../axios.config";

export const dashboard_api = {
  $_fetch_home: () => {
    const url = "/account/home";
    return GATEWAY_ENDPOINT.get(url);
  }
}