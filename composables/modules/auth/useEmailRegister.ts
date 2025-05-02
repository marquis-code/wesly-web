// useEmailRegister.ts
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useEmailRegister = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const router = useRouter()
  const payload = ref({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: ""
  });

  const registerWithEmail = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_email_register(payload.value) as any;
      if (res.type !== 'ERROR') {
        // showToast({
        //   title: "Success",
        //   message: res.data.message,
        //   toastType: "success",
        //   duration: 3000
        // });
        // router.push('/activate-account')
        return res;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.message || 'Something went wrong',
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to register account",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, registerWithEmail, payload };
};