// useUpdatePassword.ts
import { settings_api } from "@/api_factory/modules/settngs";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useUpdatePassword = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const payload = ref({
    current_password: "",
    new_password: ""
  });

  const updatePassword = async (payload: any) => {
    loading.value = true;
    try {
      const res = await settings_api.$_update_password(payload) as any;
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: res.data.message || "Password updated successfully",
          toastType: "success",
          duration: 3000
        });
        return res.data;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Something went wrong',
          toastType: "error",
          duration: 3000
        });
        return res;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to update password",
        toastType: "error",
        duration: 3000
      });
      return error;
    } finally {
      loading.value = false;
    }
  };

  return { loading, updatePassword, payload };
};