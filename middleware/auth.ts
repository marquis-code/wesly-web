import { useUser } from "@/composables/auth/user";
const { isLoggedIn } =  useUser();
export default defineNuxtRouteMiddleware((to, from) => {
  console.log('i am middle ware')
  if (!isLoggedIn.value && to.path !== "/auth") {
    return navigateTo("/auth");
  }
});
