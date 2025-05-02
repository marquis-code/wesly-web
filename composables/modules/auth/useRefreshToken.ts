// useRefreshToken.ts
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useRefreshToken = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const payload = ref({
    refresh_token: ""
  });

  const refreshToken = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_refresh_token(payload.value) as any;
      if (res.type !== 'ERROR') {
        return res.data;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Failed to refresh token',
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to refresh token",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, refreshToken, payload };
};
