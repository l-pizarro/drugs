<template>
    <div class="alert w-alert h-screen">
        <span class="block ml-18 mt-6 sf-bold text-tall tracking-wider uppercase text-gray-900">Alertas</span>
        <div class="w-full flex justify-between items-center mt-8 px-18">
            <div class="relative flex items-center">
                <input class="w-80 h-10 pl-12 pr-6 text-gray-600 rounded-lg border-2 border-gray-200 focus:outline-none focus:shadow-inner" type="text">
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
        <div class="w-full mt-10">
            <div class="w-full flex items-center mb-5 sf-bold uppercase text-gray-600">
                <span class="w-a1 pl-18">Nombre Elemento</span>
                <span class="w-a1 pl-11 hidden xxxl:block">Forma Farmaceutica</span>
                <span class="w-a2 text-right">Registro</span>
                <span class="w-a2 text-right">Vencimiento</span>
                <span class="w-a1 pl-16">Estado</span>
                <span class="w-a1 pl-10 hidden XXl:block">Razon Social</span>
            </div>
            <div class="w-full h-alert overflow-y-scroll xxxl:h-alert2 XXl:h-alert3">
                <button class="w-full h-16 flex text-left items-center sf-light text-lg text-gray-700 hover:bg-scroll-100 focus:outline-none" v-for="(medicine, index) in expired" :key="index">
                    <span class="w-a1 h-isp2 pl-18">
                        {{medicine.name}}
                    </span>
                    <div class="w-a1 pl-11 hidden xxxl:block">
                        <span class="block tracking-wider">{{medicine.formule[0]}}</span>
                        <span class="text-base text-gray-600">{{medicine.formule[1]}}</span>
                    </div>
                    <div class="w-a2 h-isp2 text-right">
                        <span class="block">{{medicine.register}}</span>
                        <span class="text-gray-600 text-base">{{medicine.isp}}</span>
                    </div>
                    <span class="w-a2 h-isp2 text-right">
                        {{medicine.expiration}}
                    </span>
                    <div class="w-a1 h-isp2 pl-16">
                        <span v-if="medicine.state[0] == 1">Venció hace {{medicine.state[1]}}</span>
                        <div v-else class="h-6 flex items-center">
                            <div :class="getBarClass(medicine.state[1])"></div>
                        </div>
                    </div>
                    <span class="w-a1 h-isp2 pl-10 hidden XXl:block">{{medicine.provider}}</span>
                </button>
            </div>
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
          sorting: 0,
          expired: [
              {name: "Abacavir Sulfato", formule: ["Solución Inyectable", "500mg"], register: "12 de en. de 2010", isp: "F-17883/15", expiration: "12 de en. de 2013", state: [1, "2 semanas"], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Sulfato", formule: ["Comprimidos recubiertos", "100mg"], register: "12 de en. de 2010", isp: "F-17883/15", expiration: "12 de en. de 2013", state: [1, "7 días"], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 12], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Ungüento tópico", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 24], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "1000mg/20ml"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 37], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "1000mg/20ml"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 50], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Comprimidos recubiertos", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 62], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Cápsulas", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 75], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 82], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 100], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 100], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Cápsulas", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 100], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 100], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 100], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 100], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 100], provider: "Laboratorios Recalcine S.A"},
              {name: "Abacavir Acetilsalicilico", formule: ["Solución Inyectable", "500mg"], register: "03 de feb. de 2012", isp: "F-1975/15", expiration: "03 de feb. de 2020", state: [0, 100], provider: "Laboratorios Recalcine S.A"},
          ]
      }
  },
  methods: {
      sort() {
          this.sorting = 1 - this.sorting;
      },
      getBarClass(state) {
          if (state <= 12.5) {
              return "w-s1 h-3 rounded bg-bar-100";
          }
          else if (state <= 25) {
              return "w-s2 h-3 rounded bg-bar-200";
          }
          else if (state <= 37.5) {
              return "w-s3 h-3 rounded bg-bar-300";
          }
          else if (state <= 50) {
              return "w-s4 h-3 rounded bg-bar-400";
          }
          else if (state <= 62.5) {
              return "w-s5 h-3 rounded bg-bar-500";
          }
          else if (state <= 75) {
              return "w-s6 h-3 rounded bg-bar-600";
          }
          else if (state <= 87.5) {
              return "w-s7 h-3 rounded bg-bar-700";
          }
          else {
              return "w-s8 h-3 rounded bg-bar-800";
          }

      }
  }
}
</script>