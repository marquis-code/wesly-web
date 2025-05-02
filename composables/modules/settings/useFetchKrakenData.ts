// useProfile.ts
import { settings_api } from "@/api_factory/modules/settngs";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useFetchKrakenData = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const krakenData = ref(null);

  const fetchKrakenData = async () => {
    loading.value = true;
    try {
      const res = await settings_api.$_fetch_kraken_data() as any;
      if (res.type !== 'ERROR') {
        krakenData.value = res.data.data;
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
    fetchKrakenData()
  })

  return { loading, fetchKrakenData, krakenData };
};