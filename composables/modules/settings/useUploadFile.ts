// useUploadFile.ts
import { settings_api } from "@/api_factory/modules/settngs";
import { useCustomToast } from '@/composables/core/useCustomToast';
import { ref } from 'vue';

export const useUploadFile = () => {
  const { showToast } = useCustomToast();
  const loading = ref(false);
  const payload = ref({});

  const uploadFile = async (fileData = payload.value) => {
    loading.value = true;
    try {
      const res = await settings_api.$_upload_file(fileData) as any;
      if (res.type !== 'ERROR') {
        showToast({
          title: "Success",
          message: res.data.message || "File uploaded successfully",
          toastType: "success",
          duration: 3000
        });
        return res.data;
      } else {
        showToast({
          title: "Error",
          message: res?.data?.error || 'Failed to upload file',
          toastType: "error",
          duration: 3000
        });
        return null;
      }
    } catch (error) {
      showToast({
        title: "Error",
        message: "Failed to upload file",
        toastType: "error",
        duration: 3000
      });
      return null;
    } finally {
      loading.value = false;
    }
  };

  return { loading, uploadFile, payload };
};