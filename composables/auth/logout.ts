import { useUser } from "@/composables/auth/user";
import { auth_api } from "@/apiFactory/modules/auth";
import { useCustomToast } from '@/composables/core/useCustomToast'

const credential = {
  usernameOrEmail: ref(""),
  password: ref(""),
};

export const useLogout = () => {
  const router = useRouter();
  const loading = ref(false);
  const { showToast } = useCustomToast();

  const isFormDisabled = computed(() => {
    return (
      loading.value || !credential.password.value || !credential.usernameOrEmail.value
    );
  });

  const logout = async () => {
    loading.value = true;
    const res = (await auth_api.$_logout({
      password: credential.password.value,
      usernameOrEmail: credential.usernameOrEmail.value,
    })) as any;
    loading.value = false;
    if (res.type !== "ERROR") {
      useUser().createUser(res.data);
      showToast({
        title: "Success",
        message: "Welcome back.!",
        toastType: "success",
        duration: 3000
      });
      router.push("/dashboard");
    }
  };
  return { credential, logout, loading, isFormDisabled };
};
