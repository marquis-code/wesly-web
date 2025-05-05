import { kraken_api } from "@/api_factory/modules/kraken";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref, onMounted } from "vue";

export const useFetchKrakenBalance = () => {
  const { showToast } = useCustomToast();
  const balance = ref(null);
  const loading = ref(false);

  const fetchBalance = async () => {
    loading.value = true;
    try {
      const res = await kraken_api.$_fetch_balance();
      balance.value = res.data.data;
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to fetch Kraken balance",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchBalance);

  return { balance, loading, fetchBalance };
};
