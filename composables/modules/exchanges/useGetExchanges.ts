import { exchanges_api } from "@/api_factory/modules/exchanges";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref, onMounted } from "vue";

export const useFetchExchanges = () => {
  const { showToast } = useCustomToast();
  const exchanges = ref([]);
  const loading = ref(false);

  const fetchExchanges = async () => {
    loading.value = true;
    try {
      const res = await exchanges_api.$_fetch_exchanges();
      exchanges.value = res.data.data;
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to fetch exchanges",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchExchanges()
  });

  return { exchanges, loading, fetchExchanges };
};
