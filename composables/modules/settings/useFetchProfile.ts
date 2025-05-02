// useProfile.ts
import { settings_api } from "@/api_factory/modules/settngs";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useFetchProfileInfo = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const profileInfo = ref(null);

  const fetchProfileInfo = async () => {
    loading.value = true;
    try {
      const res = await settings_api.$_fetch_profile() as any;
      if (res.type !== 'ERROR') {
        profileInfo.value = res.data.data;
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
    fetchProfileInfo()
  })

  return { loading, fetchProfileInfo, profileInfo };
};