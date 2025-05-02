// useDashboard.ts
import { auth_api } from "@/api_factory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useDashboard = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const dashboardData = ref(null);

  const fetchDashboard = async () => {
    loading.value = true;
    try {
      const res = await auth_api.$_dashboard() as any;
      if (res.type !== 'ERROR') {
        dashboardData.value = res.data;
        return res.data;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Failed to fetch dashboard data',
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to fetch dashboard data",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, fetchDashboard, dashboardData };
};