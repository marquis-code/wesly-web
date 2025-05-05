import { bot_api } from "@/api_factory/modules/bot";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useCreateBot = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false)

  const createBot = async (payload: any) => {
    try {
      loading.value = true
      const res = await bot_api.$_create_bot(payload);
      loading.value = true
      return res.data;
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to create bot",
        toastType: "error",
        duration: 3000
      });
      loading.value = true
      return null;
    }
  };

  return { createBot, loading };
};
