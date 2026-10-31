import { ref } from 'vue'
import { defineStore } from 'pinia'

const TOKEN_KEY = 'accessToken'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))

  function setToken(value: string): void {
    token.value = value
    localStorage.setItem(TOKEN_KEY, value)
  }

  function clearToken(): void {
    token.value = null
    localStorage.removeItem(TOKEN_KEY)
  }

  return { token, setToken, clearToken }
})
