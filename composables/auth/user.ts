import { ref, watch, computed } from "vue";
import { useStorage } from "@vueuse/core";

// Initialize the new properties
const runtimeData = {
  accessToken: ref(""),
  refreshToken: ref(""),
  role: ref(""),
};

const localStorageData = {
  accessToken: useStorage("accessToken", ""),
  refreshToken: useStorage("refreshToken", ""),
  role: useStorage("role", ""),
};

const error = ref<string | null>(null);

// Guard against null or undefined runtimeData values
watch(
  runtimeData,
  (val) => {
    Object.keys(val).forEach((key) => {
      if (val[key] != null) {
        localStorageData[key].value = val[key].value;
      }
    });
  },
  { deep: true }
);

(() => {
  runtimeData.accessToken.value = localStorageData.accessToken.value;
  runtimeData.refreshToken.value = localStorageData.refreshToken.value;
  runtimeData.role.value = localStorageData.role.value;
})();

export const REDIRECT_URL = import.meta.env.VITE_REDIRECT_URL as string;

export const useUser = () => {
  const accessToken = computed({
    get: () => runtimeData?.accessToken?.value ?? "",
    set: () => {},
  });

  const refreshToken = computed({
    get: () => runtimeData?.refreshToken?.value ?? "",
    set: () => {},
  });

  const role = computed({
    get: () => runtimeData?.role?.value ?? "",
    set: () => {},
  });

  const isLoggedIn = computed({
    get: () => {
      if (!runtimeData.accessToken?.value) return false;
      return !!runtimeData.role?.value;
    },
    set: () => {},
  });

  const logOut = () => {
    localStorage.clear();
    runtimeData.accessToken.value = "";
    runtimeData.refreshToken.value = "";
    runtimeData.role.value = "";
    location.href = '/signin';
  };

  const setTokens = (accessToken: string, refreshToken: string) => {
    runtimeData.accessToken.value = accessToken;
    runtimeData.refreshToken.value = refreshToken;
    localStorageData.accessToken.value = accessToken;
    localStorageData.refreshToken.value = refreshToken;
  };

  const createUser = (user: any) => {
    console.log(user, 'from compose');
    runtimeData.accessToken.value = user?.accessToken;
    runtimeData.refreshToken.value = user?.refreshToken;
    runtimeData.role.value = user?.role;
    localStorageData.accessToken.value = user?.accessToken;
    localStorageData.refreshToken.value = user?.refreshToken;
    localStorageData.role.value = user?.role;
  };

  const updateUser = (newUser: any) => {
    // Retrieve the existing user data from local storage
    const existingUser = JSON.parse(localStorage.getItem('user') || '{}');

    // Merge the existing user data with the new user data
    const updatedUser = { ...existingUser, ...newUser };

    // Update the runtimeData and localStorage with the new user data
    runtimeData.accessToken.value = updatedUser?.accessToken;
    runtimeData.refreshToken.value = updatedUser?.refreshToken;
    runtimeData.role.value = updatedUser?.role;
    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorageData.accessToken.value = updatedUser?.accessToken;
    localStorageData.refreshToken.value = updatedUser?.refreshToken;
    localStorageData.role.value = updatedUser?.role;
  };

  return {
    // accessToken,
    // refreshToken,
    // role,
    isLoggedIn,
    createUser,
    ...runtimeData,
    logOut,
    updateUser,
    setTokens
  };
};
