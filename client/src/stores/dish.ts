import type { Dish } from '@/types/dishStoreTypes'
import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useDishStore = defineStore('dish', () => {
  const ingredients = ref<Dish | never[]>([])
  
  return { ingredients }
})
