import { exchanges_api } from "@/api_factory/modules/exchanges";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useConnectToExchange = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false)

  const connectToExchange = async (payload: any) => {
    try {
      loading.value = true
      const res = await exchanges_api.$_connect_to_exchange(payload);
      return res.data;
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to connect to exchange",
        toastType: "error",
        duration: 3000
      });

      return null;
    }
  };

  return { connectToExchange, loading };
};
