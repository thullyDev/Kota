import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isLoading = ref(false)
  const showLoading = (state: boolean) => {
    isLoading.value = state
  }
  return { isLoading,  showLoading }
})
