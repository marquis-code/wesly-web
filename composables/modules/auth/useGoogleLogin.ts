// useGoogleLogin.ts
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useGoogleLogin = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);

  const loginWithGoogle = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_google_login() as any;
      if (res.type !== 'ERROR') {
        return res.data;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Something went wrong',
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to login with Google",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, loginWithGoogle };
};