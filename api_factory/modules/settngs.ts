import { GATEWAY_ENDPOINT } from "../axios.config";

export const settings_api = {
  $_fetch_profile: () => {
    const url = "/account/profile";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_fetch_kraken_data: () => {
    const url = "/account/kraken";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_update_password: (payload: any) => {
    const url = "/account/update-password";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_upload_file: (credential: any) => {
    const url = "/upload-file";
    return GATEWAY_ENDPOINT.post(url, credential);
  },
}