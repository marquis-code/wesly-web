import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

interface UserSettings {
  email: string
  id: string
  twoFactorEnabled: boolean
  darkMode: boolean
  lightMode: boolean
  language: string
  timeZone: string
  activeBotType: string
}

export function useSettingsManagement() {
  const settings = useStorage<UserSettings>('user-settings', {
    email: 'itemoragbenga@gmail.com',
    id: '1286458',
    twoFactorEnabled: false,
    darkMode: false,
    lightMode: true,
    language: 'English',
    timeZone: '(UTC: +01:00) Africa/Lagos',
    activeBotType: 'Smart Bot'
  })

  function toggleTwoFactor() {
    settings.value.twoFactorEnabled = !settings.value.twoFactorEnabled
  }

  function toggleDarkMode() {
    settings.value.darkMode = !settings.value.darkMode
    if (settings.value.darkMode) {
      settings.value.lightMode = false
    }
  }

  function toggleLightMode() {
    settings.value.lightMode = !settings.value.lightMode
    if (settings.value.lightMode) {
      settings.value.darkMode = false
    }
  }

  function updateEmail(email: string) {
    settings.value.email = email
  }

  function updateLanguage(language: string) {
    settings.value.language = language
  }

  function updateTimeZone(timeZone: string) {
    settings.value.timeZone = timeZone
  }

  function updateActiveBotType(botType: string) {
    settings.value.activeBotType = botType
  }

  return {
    settings,
    toggleTwoFactor,
    toggleDarkMode,
    toggleLightMode,
    updateEmail,
    updateLanguage,
    updateTimeZone,
    updateActiveBotType
  }
}