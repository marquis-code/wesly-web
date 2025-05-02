// useProfile.ts
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useProfile = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const profileData = ref(null);

  const fetchProfile = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_settings_fetch_profile() as any;
      if (res.type !== 'ERROR') {
        profileData.value = res.data.data;
        return res.data;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Failed to fetch profile data',
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to fetch profile data",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchProfile()
  })

  return { loading, fetchProfile, profileData };
};