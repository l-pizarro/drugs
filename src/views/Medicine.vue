<template>
  <div class="medicine flex h-screen bg-gray-100">
    <div class="bg-scroll-100 px-6 py-8">
      <div class="w-80">
        <div class="relative flex items-center">
          <input class="w-full h-12 pl-12 pr-6 text-gray-600 rounded-lg shadow-inner border-2 border-gray-400 bg-gray-300 focus:outline-none" type="text">
          <svg class="absolute ml-3" width="24" height="24"><path fill="#a0aec0" d="M17.23 15.521l6.486 6.5a1.2 1.2 0 01-1.709 1.685l-6.474-6.474a9.627 9.627 0 111.7-1.7zm-7.605 1.324a7.22 7.22 0 10-7.22-7.22 7.22 7.22 0 007.22 7.22z"/></svg>
        </div>
        <div class="w-full flex items-center mt-5">
          <checkbox @onCheck="checkbox = !checkbox" class="mr-3"/>
          <span v-if="checkbox" class="sf-light text-gray-800">Solo monoproveedores</span>
          <span v-else class="sf-light text-gray-600">Solo monoproveedores</span>
        </div>
        <div class="w-full h-scroll mt-6 overflow-scroll overflow-hidden xxxl:h-scroll2 XXl:h-scroll3" id="scroll">
          <div v-for="(medicine, index) in medicines" :key="index">
            <button
            v-if="index == selectedMedicine"
            class="w-full p-4 mb-5 text-left rounded-lg border border-gray-400 bg-gray-300 shadow-inner focus:outline-none">
              <div class="tracking-wider">
                <div class="w-full flex justify-between items-center sf-bold text-gray-700">
                  <span class="text-lg uppercase">{{medicine.name}}</span>
                  <span class="text-xl">{{medicine.registers}}</span>
                </div>
                <span class="sf-medium uppercase text-gray-600">{{medicine.atc}}</span>
              </div>
            </button>
            <button
            v-else
            class="w-full p-4 mb-5 text-left rounded-lg border border-gray-300 bg-gray-100 focus:outline-none"
            @click="selectedMedicine = index">
              <div class="tracking-wider">
                <div class="w-full flex justify-between items-center sf-bold text-gray-700">
                  <span class="text-lg uppercase">{{medicine.name}}</span>
                  <span class="text-xl">{{medicine.registers}}</span>
                </div>
                <span class="sf-medium uppercase text-gray-600">{{medicine.atc}}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="w-elements h-full">
      <div class="w-full h-30 px-12 pt-7 bg-gray-800">
        <span class="block sf-bold text-big text-gray-100 uppercase tracking-wider">{{medicines[selectedMedicine].name}}</span>
        <span class="sf-medium text-gray-200 uppercase tracking-wider">{{medicines[selectedMedicine].atc}}</span>
      </div>
      <div class="w-full h-16 flex items-center bg-gray-300">
        <p class="sf-light text-lg text-gray-900 ml-12">Este medicamento tiene <span class="sf-bold text-lg text-indigo-600">{{medicines[selectedMedicine].registers}}</span> registros</p>
      </div>
      <div class="w-full py-5 flex items-center sf-bold uppercase text-gray-600 mt-3">
        <span class="w-m1 pl-12">
          Nombre Elemento
        </span>
        <span class="w-m2 text-right">
          Registro
        </span>
        <span class="w-60 hidden pr-6 text-right XXl:block">
          Vencimiento
        </span>
        <span class="w-m3 pl-12">
          Razon Social
        </span>
        <span class="w-m5 hidden xxxl:block">
          Forma Farmaceutica
        </span>
      </div>
      <div class="w-full h-elements overflow-y-scroll xxxl:h-elements2 XXl:h-elements3">
        <button class="w-full h-16 flex text-left sf-light text-lg text-gray-700 hover:bg-blue-100 focus:outline-none" v-for="(element, index) in medicines[selectedMedicine].elements" :key="index">
          <span class="w-m1 pl-12">
            {{element.name}}
          </span>
          <div class="w-m2 text-right">
            <span class="block">{{element.register}}</span>
            <span class="text-gray-600 text-base">{{element.isp}}</span>
          </div>
          <span class="w-m5 hidden pr-6 text-right XXl:block">
            {{element.expiration}}
          </span>
          <span class="w-m3 pl-12">
            {{element.provider}}
          </span>
          <div class="w-m5 hidden xxxl:block">
            <span class="block">
              {{element.formule[0]}}
            </span>
            <span class="text-gray-600 text-base">
              {{element.formule[1]}}
            </span>
          </div>
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
      selectedMedicine: 0,
      medicines: [
        {
          name: "Abacavir",
          atc: "J05AF06",
          registers: 17,
          elements: [
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Acetilsalicilico", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}
          ]
        },
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]},
        {name: "Abacavir", atc: "J05AF06", registers: 17, elements: [{name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}, {name: "Abacavir Sulfato", register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "04 de jun. de 2019", expired: "2 semanas", formule: ["Solución inyectable", "500mg"]}]}
      ]
    }
  },
  methods: {
    // selectMedicine(index) {

    // }
  }
}
</script>

<style>
#scroll::-webkit-scrollbar {
    display: none;
}
#scroll {
  scrollbar-width: none;
}
</style>