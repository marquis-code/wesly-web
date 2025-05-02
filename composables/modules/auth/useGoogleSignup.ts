// useGoogleSignup.ts
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useGoogleSignup = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);

  const signupWithGoogle = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_google_signup() as any;
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
        message: "Failed to sign up with Google",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, signupWithGoogle };
};
