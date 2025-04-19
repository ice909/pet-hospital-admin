import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore('main', () => {
  const currentPathName = ref('')
  const setPath = () => {
    currentPathName.value = localStorage.getItem('currentPathName')
  }
  const logout = () => {}
  return {
    currentPathName,
    setPath,
    logout,
  }
})
