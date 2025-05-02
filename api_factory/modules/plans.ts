import { GATEWAY_ENDPOINT } from "../axios.config";

export const plans_api = {
  $_fetch_plans: () => {
    const url = "/account/plans";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_subscribe: (credential: { payment_mode: string, plan_id: string}) => {
    const url = "/account/subscribe";
    return GATEWAY_ENDPOINT.post(url, credential);
  },
}