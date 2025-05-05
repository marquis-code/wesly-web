import { exchanges_api } from "@/api_factory/modules/exchanges";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref, onMounted } from "vue";

export const useFetchConnectedExchanges = () => {
  const { showToast } = useCustomToast();
  const connectedExchanges = ref([]);
  const loading = ref(false);

  const fetchConnectedExchanges = async () => {
    loading.value = true;
    try {
      const res = await exchanges_api.$_fetch_connected_exchanges();
      connectedExchanges.value = res.data.data;
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to fetch connected exchanges",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  onMounted(fetchConnectedExchanges);

  return { connectedExchanges, loading, fetchConnectedExchanges };
};
