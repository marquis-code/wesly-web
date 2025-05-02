import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { useUser } from "@/composables/auth/user";
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router'; // ✅ Corrected the import for vue-router


const loading = ref(false);

export const useEmailVerifyAccount = () => {
  const { showToast } = useCustomToast();
  const route = useRoute();
  const { createUser } = useUser();
  const apiResponse = ref({})

  const verifyEmail = async () => {
    const token = route.query.token;  // Access query token directly
    const router = useRouter()

    if (!token) {
      showToast({
        title: "Error",
        message: "Verification token is missing from the URL.",
        toastType: "error",
        duration: 3000
      });
      return;
    }

    loading.value = true;
    const payloadObj = { token };
    const res = await auth_api.$_email_verify_link(payloadObj) as any;

    if (res && res.type !== 'ERROR') {
      showToast({
        title: "Success",
        message: res?.data?.message || "Email verified successfully.",
        toastType: "success",
        duration: 3000
      });
      createUser(res.data);
      router.push('/dashboard')
    } else {
      // Uncomment the following block if needed to handle errors:
      // showToast({
      //   title: "Error",
      //   message: res?.data?.message || "Something went wrong during verification.",
      //   toastType: "error",
      //   duration: 3000
      // });
    }
    loading.value = false
    apiResponse.value = res
    return res;
  };


  return { loading, verifyEmail, apiResponse };
};
