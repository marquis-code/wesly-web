import { bot_api } from "@/api_factory/modules/bot";
import { useCustomToast } from "@/composables/core/useCustomToast";
import { ref, onMounted } from "vue";

export const useFetchBots = () => {
  const { showToast } = useCustomToast();
  const bots = ref([]);
  const loading = ref(false);

  const fetchBots = async () => {
    loading.value = true;
    try {
      const res = await bot_api.$_fetch_bots();
      bots.value = res.data.data;
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to fetch bots",
        toastType: "error",
        duration: 3000
      });
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchBots()
  });

  return { bots, loading, fetchBots };
};
