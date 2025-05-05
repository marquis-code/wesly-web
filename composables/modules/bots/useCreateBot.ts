import { bot_api } from "@/api_factory/modules/bot";
import { useCustomToast } from "@/composables/core/useCustomToast";

export const useCreateBot = () => {
  const { showToast } = useCustomToast();

  const createBot = async (payload: any) => {
    try {
      const res = await bot_api.$_create_bot(payload);
      return res.data;
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to create bot",
        toastType: "error",
        duration: 3000
      });
      return null;
    }
  };

  return { createBot };
};
