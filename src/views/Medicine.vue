<template>
  <div class="medicine flex h-screen bg-gray-100">
    <div v-if="showElement" class="modal w-screen h-screen z-10 flex justify-center items-center absolute inset-0">
      <div class="w-1/3 px-8 py-4 z-20 sf-light text-gray-600 rounded-lg shadow-xl bg-white opacity-100" v-on-clickout="hideElement">
        <p class="sf-bold text-xl text-gray-700">{{elementShowed.name}}</p>
        <p class="">{{elementShowed.isp}}</p>
        <p>
          <span>{{elementShowed.formule[0]}} - </span>
          <span>{{elementShowed.formule[1]}}</span>
        </p>
        <p class="my-2 sf-medium">{{elementShowed.provider}}</p>
        <p class="mt-2 text-gray-500">Registrado el {{elementShowed.register}}</p>
        <p class="text-gray-500">Vence el {{elementShowed.expiration}}</p>
        <div class="w-full h-1 mt-2 rounded-full bg-indigo-100"></div>
        <p class="mt-2 text-sm text-gray-500">{{elementShowed.desc}}</p>
      </div>
    </div>
    <div class="bg-scroll-100 px-6 py-8">
      <div class="w-80">
        <div class="relative flex items-center">
          <input class="w-full h-12 pl-12 pr-6 text-gray-600 rounded-lg shadow-inner border-2 border-gray-400 bg-gray-300 focus:outline-none" type="text" v-model="query">
          <svg class="absolute ml-3" width="24" height="24"><path fill="#a0aec0" d="M17.23 15.521l6.486 6.5a1.2 1.2 0 01-1.709 1.685l-6.474-6.474a9.627 9.627 0 111.7-1.7zm-7.605 1.324a7.22 7.22 0 10-7.22-7.22 7.22 7.22 0 007.22 7.22z"/></svg>
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
      <div class="w-full h-elements overflow-y-scroll xxxl:h-elements2 XXl:h-elements3" id="elements">
        <button class="w-full h-16 flex items-center text-left sf-light text-lg text-gray-700 hover:bg-blue-100 focus:outline-none onHover" v-for="(element, index) in medicines[showMedicine].elements" :key="index">
          <span class="w-m1 h-isp pl-12 truncate">
            {{element.name}}
          </span>
          <div class="w-m2 h-isp text-right">
            <span class="block">{{element.register}}</span>
            <span class="text-gray-600 text-base">{{element.isp}}</span>
          </div>
          <span class="w-m5 h-isp hidden pr-6 text-right XXl:block">
            {{element.expiration}}
          </span>
          <span class="w-m3 h-isp pl-12 pr-4 truncate">
            {{element.provider}}
          </span> 
          <div class="w-m5 h-isp hidden xxxl:block">
            <span class="block truncate">
              {{element.formule[0]}}
            </span>
            <span class="text-gray-600 text-base">
              {{element.formule[1]}}
            </span>
          </div>
          <button class="options hidden xxl:ml-2 XXl:ml-4 focus:outline-none" @click="showElementInfo(element)">
            <svg width="8" height="32">
              <g fill="#7f9cf5" data-name="Grupo 1" transform="translate(-1388 -277)">
                <circle cx="4" cy="4" r="4" data-name="Elipse 1" transform="translate(1388 277)"/>
                <circle cx="4" cy="4" r="4" data-name="Elipse 2" transform="translate(1388 301)"/>
                <circle cx="4" cy="4" r="4" data-name="Elipse 3" transform="translate(1388 289)"/>
              </g>
            </svg>
          </button>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Fuse from 'fuse.js';
import { directive as onClickout } from 'vue-clickout'
import checkbox from '@/components/Checkbox.vue'
export default {
  components: {
    checkbox
  },
  directives: {
    onClickout: onClickout
  },
  data() {
    return {
      showElement: false,
      elementShowed: null,
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
            {name: "Abacavir Sulfato", register: "12 de en. de 2010",   isp: "F-17883/15",  provider: "Laboratorios Lafi Ltda.",                   expiration: "03 de jul. de 2019", formule: ["Comprimidor recubiertos", "351,4mg"],    desc: "Terapia de combinación antirretrovial para el tratamiento de la infección por virus de la inmunodeficiencia humana vih en adultos y niños"} ,
            {name: "Abacavir Sulfato", register: "24 de jun. de 2010",  isp: "F-18054/15",  provider: "Laboratorios Lafi Ltda.",                   expiration: "08 de jul. de 2019", formule: ["Solución oral", "2,34g"],                desc: "Terapia de combinación antirretrovial para el tratamiento de la infección por virus de la inmunodeficiencia humana vih en adultos y niños"} ,
            {name: "Abacavir Sulfato", register: "30 de ago. de 1999",  isp: "F-1974/14",   provider: "Glaxosmithkline Chile Farmacéutica Ltda.", expiration: "08 de ago. de 2019", formule: ["Comprimidor recubiertos", "351mg"],      desc: "Indicado en la terapia de combinación antiretroviral para el tratamiento de la infección por el virus de la inmunodeficiencia humana (VIH) en adultos y niños. Adultos, adolescentes y niños con un peso corporal de cuando menos 25 kg: * La dosis recomendada"} ,
            {name: "Abacavir Sulfato", register: "30 de ago. de 1999",  isp: "F-1975/19",   provider: "Glaxosmithkline Chile Farmacéutica Ltda.", expiration: "16 de sep. de 2019", formule: ["Solución oral", "2,34g/100mL"],          desc: "Indicado en la terapia de combinación antiretroviral para el tratamiento de la infección por el virus de la inmunodeficiencia humana (VIH) en adultos y niños. Adultos, adolescentes y niños con un peso corporal de cuando menos 25 kg: * La dosis recomendada"} ,
            {name: "Abacavir Sulfato", register: "07 de abril de 2014", isp: "F-21021/19",  provider: "Grünenthal Chilena Ltda.",                 expiration: "19 de oct. de 2019", formule: ["Comprimidor recubiertos", "251,39mg"],   desc: "Indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por Virus de la Inmunodeficiencia Humana (VIH) en adultos y niños"} ,
            {name: "Abacavir Sulfato", register: "22 de oct. de 2015",  isp: "F-22228/15",  provider: "Glaxosmithkline Chile Farmacéutica Ltda.", expiration: "23 de oct. de 2019", formule: ["Comprimidos recubiertos", "351mg"],      desc: "Indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por Virus de la Inmunodeficiencia Humana (VIH) en adultos y niños"} ,
            {name: "Abacavir Sulfato", register: "03 de abril de 2017", isp: "F-23410/17",  provider: "Seven Pharma Chile SpA",                   expiration: "23 de nov. de 2019", formule: ["Comprimidor recubiertos", "351mg"],      desc: "Abacavir está indicado en el tratamiento antirretroviral combinado para el tratamiento de la infección por el Virus de la Inmunodeficiencia Humana (VIH) en adultos, adolescentes y niños"} ,
            {name: "Abacavir Sulfato", register: "16 de nov. de 2018",  isp: "F-24308/18",  provider: "Seven Pharma Chile SpA",                   expiration: "27 de dic. de 2019", formule: ["Solución oral", "2,34g"],                desc: "Indicado en la terapia de combinacion antiretroviral para el tratamiento de la infeccion por el virus de la inmunodeficiencia humana (VIH) en adultos, adolescentes  y niños"} ,
            {name: "Abacavir Sulfato", register: "07 de en. de 2019",   isp: "F-24521/19",  provider: "Pharmaviral SpA",                          expiration: "31 de dic. de 2019", formule: ["Comprimidor recubiertos", "351,39mg"],   desc: "ABALIV comprimidos recubiertos 300 mg (Abacavir) está indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por el virus de la inmunodeficiencia humana (VIH) en adultos y niños"} ,
            {name: "Abacavir Sulfato", register: "16 de en. de 2019",   isp: "F-24563/19",  provider: "Difem Laboratorios S.A",                   expiration: "01 de ene. de 2020", formule: ["Comprimidor recubiertos", "351,3mg"],    desc: "Indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por Virus de la Inmunodeficiencia Humana (VIH) en adultos y niños"} ,
          ]
        },
        {
          id: 2,
          name: "Asparaginasa",
          atc: "L01XX02",
          registers: 1,
          elements: [
            {name: "Asparaginasa", register: "27 otc. de 2018", isp: "B-2710/18", provider: "C Y D Ltda.", expiration: "05 de sep. de 2021", formule: ["Polvo liofilizado para solución inyectable","10000U/I"], desc: "Spectrila está indicado como componente de un tratamiento antineoplásico combinado para el tratamiento de la leucemia linfoblástica aguda (LLA) en pacientes pediátricos desde el nacimiento hasta los 18 años y en adultos"},
          ]
        },
        {
          id: 3,
          name: "Baclofeno",
          atc: "M03BX01",
          registers: 7,
          elements: [
            {name: "Baclofeno", register: "07 de en. de 2010", isp: "F-1045/18",  provider: "Novartis Chile S.A.",          expiration: "08 de jul. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de los músculos esqueléticos en la esclerosis múltiple.Tratamiento de los trastornos que tienen lugar en las enfermedades medulares de origen infeccioso, degenerativo, traumático, neoplásico o desconocido"},
            {name: "Baclofeno", register: "07 de en. de 2010", isp: "F-11987/17", provider: "BPH S.A.",                     expiration: "09 de jul. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de la musculatura estriada en la esclerosis múltiple, espasmos musculares que componen a afecciones de la médula espiral cuya etiología sea infecciosa, degenerativa, traumática o neoplásica"},
            {name: "Baclofeno", register: "15 de en. de 2010", isp: "F-13956/19", provider: "Pharma Investi de Chile S.A.", expiration: "03 de jul. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Espasticidad de la musculatura estriada en la esclerosis múltiple. Estados espásticos en las mielopatías (de etiología infecciosa, degenerativa, traumática,neoplásica)"},
            {name: "Baclofeno", register: "18 de en. de 2010", isp: "F-15622/16", provider: "Pharmamerica Ltda.",           expiration: "02 de ago. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad en la esclerosis multiple o en otros desordenes de la medula espinal (isquemia espinal, tumor espinal, mielitis transversa, espondilosis cervical, paralisis cerebral o mielopatia degenerativa)"},
            {name: "Baclofeno", register: "22 de en. de 2010", isp: "F-21500/14", provider: "Pharma Investi de Chile S.A.", expiration: "10 de sep. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Espasticidad de la musculatura estriada en la esclerosis múltiple. Estados espásticos en las mielopatías (de etiología infecciosa, degenerativa, traumática,neoplásica)"},
            {name: "Baclofeno", register: "22 de en. de 2010", isp: "F-24342/18", provider: "Invesriones Pharmavisan S.A.", expiration: "29 de oct. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de los músculos estriados en la esclerosis múltiple. Tratamiento de trastornos espásticos asociados a enfermedades medulares de origen infeccioso, degenerativo, traumático, neoplásico o desconocido"},
            {name: "Baclofeno", register: "26 de en. de 2010", isp: "F-24620/19", provider: "Reutter S.A",                  expiration: "17 de nov. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de los músculos estriados en la esclerosis múltiple. Tratamiento de los trastornos espásticos asociados a enfermedades medulares de origen infeccioso, degenerativo, traumático, neoplásico o desconocido"},
          ]
        },
        {
          id: 4,
          name: "Calcio acetato",
          atc: "V03AE07",
          registers: 3,
          elements: [
            {name: "Calcio acetato", register: "15 de mar. de 1997", isp: "F-10058/1",  provider: "BPH S.A.",                             expiration: "01 de dic. de 2019", formule: ["Cápsulas", "500mg"],     desc: "Terapia de la hiperfosfatemia, especialmente en pacientes que padecen de insuficiencia renal avanzada"},
            {name: "Calcio acetato", register: "09 de sep. de 1994", isp: "F-11631/16", provider: "Laboratorio Pasteur S.A.",             expiration: "08 de dic. de 2019", formule: ["Comprimidos", "667mg"],  desc: "Terapia de la hiperfosfatemia, especialmente en pacientes que padecen de insuficiencia renal avanzada"},
            {name: "Calcio acetato", register: "07 de oct. de 2015", isp: "F-22187/15", provider: "Laboratorio Hospipharma Chile Ltda.",  expiration: "16 de ene. de 2020", formule: ["Comprimidos", "667mg"],  desc: "Está indicado en el control de la hiperiosfatemia en pacientes con insuficiencia renal crónica sometidos a diálisis"},
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
  },
  methods: {
    showElementInfo(element) {
      this.elementShowed = element;
      this.showElement = true;
    },
    hideElement() {
      this.showElement = false;
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
#elements::-webkit-scrollbar {
    display: none;
}
#elements {
  scrollbar-width: none;
}
.onHover:hover > .options {
  display: block;
}
.modal {
  background-color: rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.3);
  color: rgba(0, 0, 0, 0.3);
}
</style>