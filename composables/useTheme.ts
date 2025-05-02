import { ref, watch } from 'vue';

export function useTheme() {
  const isDarkMode = ref(false);
  
  // Initialize theme from localStorage if available
  if (process.client) {
    const savedTheme = localStorage.getItem('theme');
    isDarkMode.value = savedTheme === 'dark';
    applyTheme();
  }
  
  // Watch for changes and apply theme
  watch(isDarkMode, () => {
    applyTheme();
    if (process.client) {
      localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
    }
  });
  
  // Apply theme to document
  function applyTheme() {
    if (process.client) {
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
  
  // Toggle theme
  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
  }
  
  return {
    isDarkMode,
    toggleTheme
  };
}