// useResetPassword.ts
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useResetPassword = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);

  const resetPassword = async (payload:any) => {
    loading.value = true;
    try {
      const res = await auth_api.$_reset_password(payload) as any;
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: res.data.message,
          toastType: "success",
          duration: 3000
        });
        return res;
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
        message: "Failed to send password reset link",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, resetPassword };
};