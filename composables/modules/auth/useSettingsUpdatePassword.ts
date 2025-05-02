import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useSettingsUpdatePassword = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const payload = ref({
    current_password: "",
    new_password: ""
  });

  const updateSettingsPassword = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_settings_update_password(payload.value) as any;
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: res.data.message || "Password updated successfully",
          toastType: "success",
          duration: 3000
        });
        payload.value = {
          current_password: "",
          new_password: ""
        };
        return res.data;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Failed to update password',
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to update password",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, updateSettingsPassword, payload };
};