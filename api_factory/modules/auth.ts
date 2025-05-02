import { GATEWAY_ENDPOINT } from "../axios.config";

export const auth_api = {
  $_email_register: (credential: { email: string, password: string, firstname: string, lastname: string, phone: string } ) => {
    const url = "/register";
    return GATEWAY_ENDPOINT.post(url, credential);
  },
  $_email_verify_link: (credential: any) => {
    const url = "/verify-link";
    return GATEWAY_ENDPOINT.post(url, credential);
  },
  $_email_resend_verify_link: (credential: { token: string }) => {
    const url = "/resend-link";
    return GATEWAY_ENDPOINT.post(url, credential);
  },
  $_google_signup: () => {
    const url = "/google/signup";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_google_login: () => {
    const url = "/google/login";
    return GATEWAY_ENDPOINT.get(url);
  },
  $_reset_password: (payload: { email: string}) => {
    const url = "/password-reset";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_validate_token: (payload: { token: string}) => {
     const url = "/validate-token";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_update_password: (payload: { password: string, token: string }) => {
     const url = "/update-password";
    return GATEWAY_ENDPOINT.post(url, payload);
  },
  $_login: (payload: { email: string, password: string }) => {
    const url = "/login";
   return GATEWAY_ENDPOINT.post(url, payload);
 },
 $_refresh_token: (payload: { refresh_token: string }) => {
    const url = "/update-password";
   return GATEWAY_ENDPOINT.post(url, payload);
 },
 $_dashboard: () => {
    const url = "/account/home";
   return GATEWAY_ENDPOINT.get(url);
 },
 $_settings_fetch_profile: () => {
    const url = "/account/profile";
   return GATEWAY_ENDPOINT.get(url);
 },
 $_settings_update_password: (payload: { current_password: string, new_password: string }) => {
    const url = "/account/update-password";
   return GATEWAY_ENDPOINT.post(url, payload);
 },
 $_settings_upload_file: (payload: {}) => {
    const url = "/account/update-password";
   return GATEWAY_ENDPOINT.post(url, payload);
 },
};
