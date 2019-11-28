<template>
    <div class="alert w-alert h-screen">
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
        <span class="block ml-18 mt-6 sf-bold text-tall tracking-wider uppercase text-gray-900">Alertas</span>
        <div class="w-full flex justify-between items-center mt-8 px-18">
            <div class="relative flex items-center">
                <input class="w-80 h-10 pl-12 pr-6 text-gray-600 rounded-lg border-2 border-gray-200 focus:outline-none focus:shadow-inner" v-model="query" type="text">
                <svg class="absolute ml-3" width="24" height="24"><path fill="#CBD5E1" d="M17.23 15.521l6.486 6.5a1.2 1.2 0 01-1.709 1.685l-6.474-6.474a9.627 9.627 0 111.7-1.7zm-7.605 1.324a7.22 7.22 0 10-7.22-7.22 7.22 7.22 0 007.22 7.22z"/></svg>
            </div>
            <div class="flex">
                <div>
                    <button v-if="sorting != 0" class="sf-light text-lg text-gray-500 focus:outline-none" @click="sorting = 0">
                        <span class="block">Ordenar alfabéticamente</span>
                    </button>
                    <button v-else class="sf-light text-lg text-gray-500 focus:outline-none" @click="sorting = -1">
                        <span class="block text-gray-800">Ordenar alfabéticamente</span>
                    </button>
                    <div class="w-full h-1 mt-px">   
                        <div v-if="sorting == 0" class="w-full h-full rounded-full bg-indigo-400"></div>
                    </div>
                </div>
                <div class="ml-10">
                    <button v-if="sorting != 1" class="sf-light text-lg text-gray-500 focus:outline-none" @click="sorting = 1">
                        <span class="block">Ordenar por vencimiento</span>
                    </button>
                    <button v-else class="sf-light text-lg text-gray-500 focus:outline-none" @click="sorting = -1">
                        <span class="block text-gray-800">Ordenar por vencimiento</span>
                    </button>
                    <div class="w-full h-1 mt-px">
                        <div v-if="sorting == 1" class="w-full h-full rounded-full bg-indigo-400"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center mt-7 pl-18">
            <div class="flex items-center">
                <checkbox @onCheck="checkboxExpired = !checkboxExpired" class="mr-3"/>
                <span v-if="!checkboxExpired" class="sf-light text-xl text-gray-500">Filtrar por vencimiento crítico</span>
                <span v-else class="sf-light text-xl text-gray-600">Filtrar por vencimiento crítico</span>
            </div>
            <div class="flex items-center ml-10 xxxl:ml-12 XXl:ml-16">                
                <checkbox @onCheck="checkboxProvider = !checkboxProvider" class="mr-3"/>
                <span v-if="!checkboxProvider" class="sf-light text-xl text-gray-500">Filtrar solo monoproveedores</span>
                <span v-else class="sf-light text-xl text-gray-600">Filtrar solo monoproveedores</span>
            </div>
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
            <div class="w-full h-alert overflow-y-scroll xxxl:h-alert2 XXl:h-alert3" id="elements">
                <button class="w-full h-16 flex text-left items-center sf-light text-lg text-gray-700 hover:bg-scroll-100 focus:outline-none onHover" v-for="(medicine, index) in filteredExpired" :key="index">
                    <span class="w-a1 h-isp2 pl-18">
                        {{medicine.name}}
                    </span>
                    <div class="w-a1 pl-11 hidden xxxl:block">
                        <span class="block tracking-wider truncate">{{medicine.formule[0]}}</span>
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
                    <span class="w-a1 h-isp2 pl-10 hidden truncate XXl:block">{{medicine.provider}}</span>
                    <button class="options ml-4 xxl:ml-8 XXl:ml-12 hidden focus:outline-none" @click="showElementInfo(medicine)">
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
            checkboxExpired: false,
            checkboxProvider: false,
            sorting: -1,
            fuse: null,
            query: "",
            fuseOptions: {
                shouldSort: true,
                threshold: 0.3,
                location: 0,
                distance: 100,
                maxPatternLength: 10,
                minMatchCharLength: 3,
                keys: ['name', 'isp']
            },
            expired: [
                {name: "Abacavir Sulfato", mono: false, critic: false,   register: "12 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Lafi Ltda.", expiration: "03 de jul. de 2019", formule: ["Comprimidor recubiertos", "351,4mg"], desc: "Terapia de combinación antirretrovial para el tratamiento de la infección por virus de la inmunodeficiencia humana vih en adultos y niños", state: [1, "4 meses"], days: -120},
                {name: "Abacavir Sulfato", mono: false, critic: true,    register: "24 de jun. de 2010", isp: "F-18054/15", provider: "Laboratorios Lafi Ltda.", expiration: "08 de jul. de 2020", formule: ["Solución oral", "2,34g"], desc: "Terapia de combinación antirretrovial para el tratamiento de la infección por virus de la inmunodeficiencia humana vih en adultos y niños", state: [0, 30], days: 30},
                {name: "Abacavir Sulfato", mono: false, critic: false,   register: "30 de ago. de 1999", isp: "F-1974/14", provider: "Glaxosmithkline Chile Farmacéutica Ltda.", expiration: "08 de ago. de 2021", formule: ["Comprimidor recubiertos", "351mg"], desc: "Indicado en la terapia de combinación antiretroviral para el tratamiento de la infección por el virus de la inmunodeficiencia humana (VIH) en adultos y niños. Adultos, adolescentes y niños con un peso corporal de cuando menos 25 kg: * La dosis recomendada", state: [0, 50], days: 50},
                {name: "Abacavir Sulfato", mono: false, critic: false,   register: "30 de ago. de 1999", isp: "F-1975/19", provider: "Glaxosmithkline Chile Farmacéutica Ltda.", expiration: "16 de sep. de 2021", formule: ["Solución oral", "2,34g/100mL"], desc: "Indicado en la terapia de combinación antiretroviral para el tratamiento de la infección por el virus de la inmunodeficiencia humana (VIH) en adultos y niños. Adultos, adolescentes y niños con un peso corporal de cuando menos 25 kg: * La dosis recomendada", state: [0, 50], days: 50},
                {name: "Abacavir Sulfato", mono: false, critic: false,   register: "07 de abril de 2014", isp: "F-21021/19", provider: "Grünenthal Chilena Ltda.", expiration: "19 de oct. de 2022", formule: ["Comprimidor recubiertos", "251,39mg"], desc: "Indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por Virus de la Inmunodeficiencia Humana (VIH) en adultos y niños", state: [0, 65], days: 65},
                {name: "Abacavir Sulfato", mono: false, critic: false,   register: "22 de oct. de 2015", isp: "F-22228/15", provider: "Glaxosmithkline Chile Farmacéutica Ltda.", expiration: "23 de oct. de 2030", formule: ["Comprimidos recubiertos", "351mg"], desc: "Indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por Virus de la Inmunodeficiencia Humana (VIH) en adultos y niños", state: [0, 90], days: 90},
                {name: "Abacavir Sulfato", mono: false, critic: false,   register: "03 de abril de 2017", isp: "F-23410/17", provider: "Seven Pharma Chile SpA", expiration: "23 de nov. de 2030", formule: ["Comprimidor recubiertos", "351mg"], desc: "Abacavir está indicado en el tratamiento antirretroviral combinado para el tratamiento de la infección por el Virus de la Inmunodeficiencia Humana (VIH) en adultos, adolescentes y niños", state: [0, 90], days: 90},
                {name: "Abacavir Sulfato", mono: false, critic: true,    register: "16 de nov. de 2018", isp: "F-24308/18", provider: "Seven Pharma Chile SpA", expiration: "27 de dic. de 2019", formule: ["Solución oral", "2,34g"], desc: "Indicado en la terapia de combinacion antiretroviral para el tratamiento de la infeccion por el virus de la inmunodeficiencia humana (VIH) en adultos, adolescentes  y niños", state: [0, 10], days: 10},
                {name: "Abacavir Sulfato", mono: false, critic: true,    register: "07 de en. de 2019", isp: "F-24521/19", provider: "Pharmaviral SpA", expiration: "31 de dic. de 2019", formule: ["Comprimidor recubiertos", "351,39mg"], desc: "ABALIV comprimidos recubiertos 300 mg (Abacavir) está indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por el virus de la inmunodeficiencia humana (VIH) en adultos y niños", state: [0, 10], days: 10},
                {name: "Abacavir Sulfato", mono: false, critic: false,   register: "16 de en. de 2019", isp: "F-24563/19", provider: "Difem Laboratorios S.A", expiration: "01 de ene. de 2025", formule: ["Comprimidor recubiertos", "351,3mg"], desc: "Indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por Virus de la Inmunodeficiencia Humana (VIH) en adultos y niños", state: [0, 80], days: 80},

                {name: "Asparaginasa", mono: true, critic: true, register: "27 otc. de 2018", isp: "B-2710/18", provider: "C Y D Ltda.", expiration: "05 de sep. de 2021", formule: ["Polvo liofilizado para solución inyectable","10000U/I"], desc: "Spectrila está indicado como componente de un tratamiento antineoplásico combinado para el tratamiento de la leucemia linfoblástica aguda (LLA) en pacientes pediátricos desde el nacimiento hasta los 18 años y en adultos", state: [0, 50], days: 50},

                {name: "Baclofeno", mono: false, critic: false,  register: "07 de en. de 2010", isp: "F-1045/18",  provider: "Novartis Chile S.A.",          expiration: "08 de oct. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de los músculos esqueléticos en la esclerosis múltiple.Tratamiento de los trastornos que tienen lugar en las enfermedades medulares de origen infeccioso, degenerativo, traumático, neoplásico o desconocido", state: [1, "1 mes"], days: -30},
                {name: "Baclofeno", mono: false, critic: false,  register: "07 de en. de 2010", isp: "F-11987/17", provider: "BPH S.A.",                     expiration: "09 de oct. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de la musculatura estriada en la esclerosis múltiple, espasmos musculares que componen a afecciones de la médula espiral cuya etiología sea infecciosa, degenerativa, traumática o neoplásica", state: [1, "1 mes"], days: -30},
                {name: "Baclofeno", mono: false, critic: false,  register: "15 de en. de 2010", isp: "F-13956/19", provider: "Pharma Investi de Chile S.A.", expiration: "03 de nov. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Espasticidad de la musculatura estriada en la esclerosis múltiple. Estados espásticos en las mielopatías (de etiología infecciosa, degenerativa, traumática,neoplásica)", state: [1, "2 semanas"], days: -14},
                {name: "Baclofeno", mono: false, critic: true,   register: "18 de en. de 2010", isp: "F-15622/16", provider: "Pharmamerica Ltda.",           expiration: "02 de ago. de 2020",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad en la esclerosis multiple o en otros desordenes de la medula espinal (isquemia espinal, tumor espinal, mielitis transversa, espondilosis cervical, paralisis cerebral o mielopatia degenerativa)", state: [0, 30], days:30},
                {name: "Baclofeno", mono: false, critic: false,  register: "22 de en. de 2010", isp: "F-21500/14", provider: "Pharma Investi de Chile S.A.", expiration: "10 de sep. de 2021",   formule: ["Comprimidos", "10mg"], desc: "Espasticidad de la musculatura estriada en la esclerosis múltiple. Estados espásticos en las mielopatías (de etiología infecciosa, degenerativa, traumática,neoplásica)", state: [0, 50], days: 50},
                {name: "Baclofeno", mono: false, critic: false,  register: "22 de en. de 2010", isp: "F-24342/18", provider: "Invesriones Pharmavisan S.A.", expiration: "29 de oct. de 2022",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de los músculos estriados en la esclerosis múltiple. Tratamiento de trastornos espásticos asociados a enfermedades medulares de origen infeccioso, degenerativo, traumático, neoplásico o desconocido", state: [0, 65], days: 65},
                {name: "Baclofeno", mono: false, critic: false,  register: "26 de en. de 2010", isp: "F-24620/19", provider: "Reutter S.A",                  expiration: "17 de nov. de 2022",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de los músculos estriados en la esclerosis múltiple. Tratamiento de los trastornos espásticos asociados a enfermedades medulares de origen infeccioso, degenerativo, traumático, neoplásico o desconocido", state: [0, 65], days: 65},

                {name: "Calcio acetato", mono: false, critic: true, register: "15 de mar. de 1997", isp: "F-10058/1",  provider: "BPH S.A.",                             expiration: "01 de sep. de 2020", formule: ["Cápsulas", "500mg"],     desc: "Terapia de la hiperfosfatemia, especialmente en pacientes que padecen de insuficiencia renal avanzada", state: [0, 30], days: 30},
                {name: "Calcio acetato", mono: false, critic: true, register: "09 de sep. de 1994", isp: "F-11631/16", provider: "Laboratorio Pasteur S.A.",             expiration: "08 de nov. de 2020", formule: ["Comprimidos", "667mg"],  desc: "Terapia de la hiperfosfatemia, especialmente en pacientes que padecen de insuficiencia renal avanzada", state: [0, 30], days: 30},
                {name: "Calcio acetato", mono: false, critic: false, register: "07 de oct. de 2015", isp: "F-22187/15", provider: "Laboratorio Hospipharma Chile Ltda.",  expiration: "16 de ene. de 2022", formule: ["Comprimidos", "667mg"],  desc: "Está indicado en el control de la hiperiosfatemia en pacientes con insuficiencia renal crónica sometidos a diálisis", state: [0, 65], days: 60},
            ]
        }
    },
    mounted() {
        console.log(_);
        this.fuse = new Fuse(this.expired, this.fuseOptions);
    },
    computed: {
        filteredExpired() {
            var results = [];

            if (this.query.length > 0) {
                results = this.fuse.search(this.query)
            }
            else {
                results = this.expired;
            }
            if (this.checkboxExpired) {
                results = this.filterExpired(results);
            }
            if (this.checkboxProvider) {
                results = this.filterProvider(results);
            }
            if (this.sorting == 0) {
                results = _.sortBy(results, ['name']);
                console.log("Sorting")
                console.log(results);
            }
            if (this.sorting == 1) {
                results = _.sortBy(results, ['days']);
                console.log("Sorting")
                console.log(results);
            }
            
            return results;
        }
    },
    methods: {
        filterExpired(expired) {
            var results = [];
            expired.forEach(element => {
                if (element.critic) {
                    results.push(element);
                }
            });
            return results; 
        },

        filterProvider(expired) {
            var results = [];
            expired.forEach(element => {
                if (element.mono) {
                    results.push(element);
                }
            });
            return results; 
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
        },
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
.onHover:hover > .options {
  display: block;
}
#elements::-webkit-scrollbar {
    display: none;
}
#elements {
  scrollbar-width: none;
}
</style>