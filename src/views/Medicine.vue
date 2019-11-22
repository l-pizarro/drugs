<template>
  <div class="medicine px-6 py-8 h-screen bg-scroll-100">
    <div class="w-80">
      <input class="w-full h-12 px-4 text-gray-600 rounded-lg shadow-inner border-2 border-gray-400 bg-gray-300 focus:outline-none" type="text">
      <div class="w-full flex items-center mt-5">
        <checkbox @onCheck="checkbox = !checkbox" class="mr-3"/>
        <span v-if="checkbox" class="sf-light text-gray-800">Solo monoproveedores</span>
        <span v-else class="sf-light text-gray-600">Solo monoproveedores</span>
      </div>
      <div class="mt-6 w-full">

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
      selectedMedicine: 0,
      medicines: [
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},]}
      ]
    }
  }
}
</script>

<style>

</style>