<template>
    <div class="alert w-full h-screen">
        <span class="block ml-18 mt-8 sf-bold text-3xl tracking-wider uppercase text-gray-900">Alertas</span>
        <div class="w-full flex justify-between items-center mt-8 px-18">
            <div class="relative flex items-center">
                <input class="w-80 h-12 pl-12 pr-6 text-gray-600 rounded-lg border-2 border-gray-200 focus:outline-none focus:shadow-inner" type="text">
                <svg class="absolute ml-3" width="24" height="24"><path fill="#CBD5E1" d="M17.23 15.521l6.486 6.5a1.2 1.2 0 01-1.709 1.685l-6.474-6.474a9.627 9.627 0 111.7-1.7zm-7.605 1.324a7.22 7.22 0 10-7.22-7.22 7.22 7.22 0 007.22 7.22z"/></svg>
            </div>
            <div class="flex">
                <div>
                    <button class="sf-light text-lg text-gray-500 focus:outline-none" @click="sort()">
                        <span v-if="sorting != 0" class="block">Ordenar alfabéticamente</span>
                        <span v-else class="block text-gray-800">Ordenar alfabéticamente</span>
                    </button>
                    <div v-if="sorting == 0" class="w-full h-1 mt-px rounded-full bg-indigo-400"></div>
                </div>
                <div class="ml-10">
                    <button class="sf-light text-lg text-gray-500 focus:outline-none" @click="sort()">
                        <span v-if="sorting != 1" class="block">Ordenar por vencimiento</span>
                        <span v-else class="block text-gray-800">Ordenar por vencimiento</span>
                    </button>
                    <div v-if="sorting == 1" class="w-full h-1 mt-px rounded-full bg-indigo-400"></div>
                </div>
            </div>
        </div>
        <div class="flex items-center mt-7 pl-18">
            <checkbox @onCheck="checkbox = !checkbox" class="mr-3"/>
            <span v-if="!checkbox" class="sf-light text-xl text-gray-500">Filtrar por vencimiento crítico</span>
            <span v-else class="sf-light text-xl text-gray-600">Filtrar por vencimiento crítico</span>
        </div>
    </div>
</template>

<script>
import checkbox from '@/components/Checkbox.vue'
export default {
  components: {
    checkbox
  },
  data() {
      return {
          checkbox: false,
          sorting: 0
      }
  },
  methods: {
      sort() {
          this.sorting = 1 - this.sorting;
      }
  }
}
</script>