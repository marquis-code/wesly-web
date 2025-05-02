// useResendVerificationLink.ts
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useResendVerificationLink = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const payload = ref({
    token: ""
  });

  const resendVerificationLink = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_email_resend_verify_link(payload.value) as any;
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: res.data.message,
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
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to resend verification link",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, resendVerificationLink, payload };
};
