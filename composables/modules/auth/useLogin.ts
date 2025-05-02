// useLogin.ts
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import {useUser} from "@/composables/auth/user"
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useLogin = () => {
  const { showToast } = useCustomToast();
  const router = useRouter();
  const { createUser } = useUser()
  const loading = ref(false);
  const payload = ref({
    email: "",
    password: ""
  });

  const login = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_login(payload.value) as any;
      console.log(res, 'loginres')
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: "Login successful",
          toastType: "success",
          duration: 3000
        });
        createUser(res.data.data)
        router.push('/dashboard');
        window.location.href = '/dashboard'
        return res.data;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.message,
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to login",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, login, payload };
};