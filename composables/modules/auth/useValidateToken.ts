// useValidateToken.ts
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useValidateToken = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const payload = ref({
    token: ""
  });

  const validateToken = async (payload: any) => {
      loading.value = true;
      const res = await auth_api.$_validate_token(payload) as any;
      loading.value = false;
      return res
  };

  return { loading, validateToken, payload };
};