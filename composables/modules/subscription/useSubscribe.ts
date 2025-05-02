// useProfile.ts
import { plans_api } from "@/api_factory/modules/plans";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useSubscribe = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);

  const subscribe = async (payload: { plan_id: string, payment_mode: string}) => {
    loading.value = true;
    try {
      const res = await plans_api.$_subscribe(payload) as any;
      if (res.type !== 'ERROR') {
        return res;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Failed to subscribe',
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to subscribe",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, subscribe };
};