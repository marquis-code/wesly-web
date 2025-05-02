// useProfile.ts
import { dashboard_api } from "@/api_factory/modules/dashboard";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useFetchHomeInfo = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const homeInfo = ref(null);

  const fetchHomeInfo = async () => {
    loading.value = true;
    try {
      const res = await dashboard_api.$_fetch_home() as any;
      if (res.type !== 'ERROR') {
        homeInfo.value = res.data.data;
        return res.data.data;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Failed to fetch',
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to fetch",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() =>{
    fetchHomeInfo()
  })

  return { loading, fetchHomeInfo, homeInfo };
};