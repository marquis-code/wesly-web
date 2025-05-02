// useProfile.ts
import { plans_api } from "@/api_factory/modules/plans";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useFetchPlans = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const plansList = ref(null);

  const fetchPlans = async () => {
    loading.value = true;
    try {
      const res = await plans_api.$_fetch_plans() as any;
      if (res.type !== 'ERROR') {
        plansList.value = res.data.data;
        return res.data.data;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Failed to fetch plans',
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to fetch plans",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() =>{
    fetchPlans()
  })

  return { loading, fetchPlans, plansList };
};