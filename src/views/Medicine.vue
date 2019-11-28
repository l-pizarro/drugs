<template>
  <div class="medicine flex h-screen bg-gray-100">
    <div class="bg-scroll-100 px-6 py-8">
      <div class="w-80">
        <div class="relative flex items-center">
          <input class="w-full h-12 pl-12 pr-6 text-gray-600 rounded-lg shadow-inner border-2 border-gray-400 bg-gray-300 focus:outline-none" type="text" v-model="query">
          <svg class="absolute ml-3" width="24" height="24"><path fill="#a0aec0" d="M17.23 15.521l6.486 6.5a1.2 1.2 0 01-1.709 1.685l-6.474-6.474a9.627 9.627 0 111.7-1.7zm-7.605 1.324a7.22 7.22 0 10-7.22-7.22 7.22 7.22 0 007.22 7.22z"/></svg>
        </div>
        <div class="w-full flex items-center mt-5">
          <checkbox @onCheck="checkbox = !checkbox" class="mr-3"/>
          <span v-if="checkbox" class="sf-light text-gray-800">Solo monoproveedores</span>
          <span v-else class="sf-light text-gray-600">Solo monoproveedores</span>
        </div>
        <div class="w-full h-scroll mt-6 overflow-scroll overflow-hidden xxxl:h-scroll2 XXl:h-scroll3" id="scroll" v-if="filteredMedicines.length != 0">
          <div v-for="(medicine, index) in filteredMedicines" :key="index">
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
            @click="selectedMedicine = medicine.id - 1; showMedicine = medicine.id -1">
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
        <span class="block sf-bold text-big text-gray-100 uppercase tracking-wider">{{medicines[showMedicine].name}}</span>
        <span class="sf-medium text-gray-200 uppercase tracking-wider">{{medicines[showMedicine].atc}}</span>
      </div>
      <div class="w-full h-16 flex items-center bg-gray-300">
        <p class="sf-light text-lg text-gray-900 ml-12">Este medicamento tiene <span class="sf-bold text-lg text-indigo-600">{{medicines[showMedicine].registers}}</span> registros</p>
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
        <button class="w-full h-16 flex items-center text-left sf-light text-lg text-gray-700 hover:bg-blue-100 focus:outline-none onHover" v-for="(element, index) in medicines[showMedicine].elements" :key="index">
          <span class="w-m1 h-isp pl-12">
            {{element.name}}
          </span>
          <div class="w-m2 h-isp text-right">
            <span class="block">{{element.register}}</span>
            <span class="text-gray-600 text-base">{{element.isp}}</span>
          </div>
          <span class="w-m5 h-isp hidden pr-6 text-right XXl:block">
            {{element.expiration}}
          </span>
          <span class="w-m3 h-isp pl-12">
            {{element.provider}}
          </span>
          <div class="w-m5 h-isp hidden xxxl:block">
            <span class="block">
              {{element.formule[0]}}
            </span>
            <span class="text-gray-600 text-base">
              {{element.formule[1]}}
            </span>
          </div>
          <div class="options hidden">
            <svg width="8" height="32">
              <g fill="#7f9cf5" data-name="Grupo 1" transform="translate(-1388 -277)">
                <circle cx="4" cy="4" r="4" data-name="Elipse 1" transform="translate(1388 277)"/>
                <circle cx="4" cy="4" r="4" data-name="Elipse 2" transform="translate(1388 301)"/>
                <circle cx="4" cy="4" r="4" data-name="Elipse 3" transform="translate(1388 289)"/>
              </g>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js';
import checkbox from '@/components/Checkbox.vue'
export default {
  components: {
    checkbox
  },
  data() {
    return {
      fuse: null,
      query: "",
      fuseOptions: {
          shouldSort: true,
          threshold: 0.3,
          location: 0,
          distance: 100,
          maxPatternLength: 10,
          minMatchCharLength: 3,
          keys: ['name', 'atc']
      },
      checkbox: false,
      selectedMedicine: 0,
      showMedicine: 0,
      medicines: [
        {
          id: 1,
          name: "Abacavir",
          atc: "J05AF06",
          registers: 10,
          elements: [
            {name: "Abacavir Sulfato", register: "02 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Lafi Ltda.", left: 0, expiration: "03 de jul. de 2019", formule: ["Comprimidor recubiertos", "500mg"]},
            {name: "Abacavir Sulfato", register: "07 de en. de 2010", isp: "F-18040/15", provider: "Laboratorios Lafi Ltda.", left: 0, expiration: "08 de jul. de 2019", formule: ["Solución oral", "5g"]},
            {name: "Abacavir Sulfato", register: "07 de en. de 2010", isp: "F-19264/12", provider: "Grünenthal Chilena Ltda.", left: 0, expiration: "08 de jul. de 2019", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "15 de en. de 2010", isp: "F-20353/12", provider: "Seven Pharma Chile", left: 0, expiration: "16 de jul. de 2019", formule: ["Solución inyectable", "2,34mg"]},
            {name: "Abacavir Sulfato", register: "18 de en. de 2010", isp: "F-23004/15", provider: "Seven Pharma Chile", left: 0, expiration: "19 de jul. de 2019", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "22 de en. de 2010", isp: "F-30300/19", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "23 de jul. de 2019", formule: ["Comprimidos recubiertos", "351,4mg"]},
            {name: "Abacavir Sulfato", register: "22 de en. de 2010", isp: "F-21888/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "23 de jul. de 2019", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "26 de en. de 2010", isp: "F-14142/18", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "27 de jul. de 2019", formule: ["Solución inyectable", "2,34mg"]},
            {name: "Abacavir Sulfato", register: "30 de en. de 2010", isp: "F-17000/15", provider: "Grünenthal Chilena Ltda.", left: 0, expiration: "31 de jul. de 2019", formule: ["Solución inyectable", "500mg"]},
            {name: "Abacavir Sulfato", register: "31 de en. de 2010", isp: "F-17001/16", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "01 de jul. de 2019", formule: ["Solución inyectable", "500mg"]},
          ]
        },
        {
          id: 2,
          name: "Baclofeno",
          atc: "M03BX01",
          registers: 7,
          elements: [
            {name: "Baclofeno", register: "07 de en. de 2010", isp: "F-1045/18", provider: "Laboratorios Lafi Ltda.", left: 0, expiration: "08 de jul. de 2019", formule: ["Solución oral", "5g"]},
            {name: "Baclofeno", register: "07 de en. de 2010", isp: "F-11987/12", provider: "Grünenthal Chilena Ltda.", left: 0, expiration: "08 de jul. de 2019", formule: ["Solución inyectable", "500mg"]},
            {name: "Baclofeno", register: "15 de en. de 2010", isp: "F-13956/12", provider: "Seven Pharma Chile", left: 0, expiration: "16 de jul. de 2019", formule: ["Solución inyectable", "2,34mg"]},
            {name: "Baclofeno", register: "18 de en. de 2010", isp: "F-14354/15", provider: "Seven Pharma Chile", left: 0, expiration: "19 de jul. de 2019", formule: ["Solución inyectable", "500mg"]},
            {name: "Baclofeno", register: "22 de en. de 2010", isp: "F-21500/14", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "23 de jul. de 2019", formule: ["Comprimidos recubiertos", "351,4mg"]},
            {name: "Baclofeno", register: "22 de en. de 2010", isp: "F-21888/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "23 de jul. de 2019", formule: ["Solución inyectable", "500mg"]},
            {name: "Baclofeno", register: "26 de en. de 2010", isp: "F-24620/18", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "27 de jul. de 2019", formule: ["Solución inyectable", "2,34mg"]},
          ]
        },
        {
          id: 3,
          name: "Calcio acetato",
          atc: "LB75ZP1",
          registers: 3,
          elements: [
            {name: "Calcio acetato", register: "08 de nov. de 2010", isp: "F-1045/18", provider: "Laboratorios Lafi Ltda.", left: 0, expiration: "08 de ago. de 2019", formule: ["Solución oral", "5g"]},
            {name: "Calcio acetato", register: "09 de nov. de 2010", isp: "F-11987/12", provider: "Grünenthal Chilena Ltda.", left: 0, expiration: "08 de ago. de 2019", formule: ["Solución inyectable", "500mg"]},
            {name: "Calcio acetato", register: "16 de dic. de 2010", isp: "F-13956/12", provider: "Seven Pharma Chile", left: 0, expiration: "16 de en. de 2019", formule: ["Solución inyectable", "2,34mg"]},
          ]
        },
      ]
    }
  },
  mounted() {
    this.fuse = new Fuse(this.medicines, this.fuseOptions);
  },
  computed: {
      filteredMedicines() {
        if (this.query.length > 0) {
            this.selectedMedicine = -1;
            return this.fuse.search(this.query);
        }
        return this.medicines;
      }
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
.onHover:hover > .options {
  display: block;
}
</style>