<template>
    <div class="alert w-alert h-screen">
        <span class="block ml-18 mt-6 sf-bold text-tall tracking-wider uppercase text-gray-900">Alertas</span>
        <div class="w-full flex justify-between items-center mt-8 px-18">
            <div class="relative flex items-center">
                <input class="w-80 h-10 pl-12 pr-6 text-gray-600 rounded-lg border-2 border-gray-200 focus:outline-none focus:shadow-inner" v-model="query" type="text">
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
                <button class="w-full h-16 flex text-left items-center sf-light text-lg text-gray-700 hover:bg-scroll-100 focus:outline-none" v-for="(medicine, index) in filteredExpired" :key="index">
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
import Fuse from 'fuse.js';
import checkbox from '@/components/Checkbox.vue'
export default {
    components: {
        checkbox
    },
    data() {
        return {
            checkbox: false,
            sorting: 0,
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
                {name: "Abacavir Sulfato", register: "02 de en. de 2010", isp: "F-17883/15", provider: "Laboratorios Lafi Ltda.", left: 0, expiration: "03 de jul. de 2019", formule: ["Comprimidor recubiertos", "500mg"], state: [1, "4 meses"]},
                {name: "Abacavir Sulfato", register: "07 de en. de 2010", isp: "F-18040/15", provider: "Laboratorios Lafi Ltda.", left: 0, expiration: "08 de oct. de 2019", formule: ["Solución oral", "5g"], state: [1, "1 mes"]},
                {name: "Abacavir Sulfato", register: "07 de en. de 2010", isp: "F-19264/12", provider: "Grünenthal Chilena Ltda.", left: 0, expiration: "08 de nov. de 2019", formule: ["Solución inyectable", "500mg"], state: [1, "2 semanas"]},
                {name: "Abacavir Sulfato", register: "15 de en. de 2010", isp: "F-20353/12", provider: "Seven Pharma Chile", left: 0, expiration: "16 de dic de 2019", formule: ["Solución inyectable", "2,34mg"], state: [0, 12]},
                {name: "Abacavir Sulfato", register: "18 de en. de 2010", isp: "F-23004/15", provider: "Seven Pharma Chile", left: 0, expiration: "19 de dic de 2019", formule: ["Solución inyectable", "500mg"], state: [0, 24]},
                {name: "Abacavir Sulfato", register: "22 de en. de 2010", isp: "F-30300/19", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "23 de dic de 2019", formule: ["Comprimidos recubiertos", "351,4mg"], state: [0, 37]},
                {name: "Abacavir Sulfato", register: "22 de en. de 2010", isp: "F-21888/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "23 de jul. de 2020", formule: ["Solución inyectable", "500mg"], state: [0, 50]},
                {name: "Abacavir Sulfato", register: "26 de en. de 2010", isp: "F-14142/18", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "27 de jul. de 2020", formule: ["Solución inyectable", "2,34mg"], state: [0, 62]},
                {name: "Abacavir Sulfato", register: "30 de en. de 2010", isp: "F-17000/15", provider: "Grünenthal Chilena Ltda.", left: 0, expiration: "31 de jul. de 2020", formule: ["Solución inyectable", "500mg"], state: [0, 80]},
                {name: "Abacavir Sulfato", register: "31 de en. de 2010", isp: "F-17001/16", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "01 de jul. de 2019", formule: ["Solución inyectable", "500mg"], state: [0, 100]},
                {name: "Baclofeno", register: "07 de en. de 2010", isp: "F-1045/18", provider: "Laboratorios Lafi Ltda.", left: 0, expiration: "08 de jul. de 2019", formule: ["Solución oral", "5g"], state: [1, "4 meses"]},
                {name: "Baclofeno", register: "07 de en. de 2010", isp: "F-11987/12", provider: "Grünenthal Chilena Ltda.", left: 0, expiration: "08 de jul. de 2019", formule: ["Solución inyectable", "500mg"], state: [1, "3 semanas"]},
                {name: "Baclofeno", register: "15 de en. de 2010", isp: "F-13956/12", provider: "Seven Pharma Chile", left: 0, expiration: "16 de jul. de 2019", formule: ["Solución inyectable", "2,34mg"], state: [1, "8 días"]},
                {name: "Baclofeno", register: "18 de en. de 2010", isp: "F-14354/15", provider: "Seven Pharma Chile", left: 0, expiration: "19 de jul. de 2019", formule: ["Solución inyectable", "500mg"], state: [1, "2 días"]},
                {name: "Baclofeno", register: "22 de en. de 2010", isp: "F-21500/14", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "23 de jul. de 2019", formule: ["Comprimidos recubiertos", "351,4mg"], state: [0, 40]},
                {name: "Baclofeno", register: "22 de en. de 2010", isp: "F-21888/15", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "23 de jul. de 2019", formule: ["Solución inyectable", "500mg"], state: [0, 50]},
                {name: "Baclofeno", register: "26 de en. de 2010", isp: "F-24620/18", provider: "Laboratorios Recalcine S.A", left: 0, expiration: "27 de jul. de 2019", formule: ["Solución inyectable", "2,34mg"], state: [0, 60]},
                {name: "Calcio acetato", register: "08 de nov. de 2010", isp: "F-1045/18", provider: "Laboratorios Lafi Ltda.", left: 0, expiration: "08 de ago. de 2019", formule: ["Solución oral", "5g"], state: [0, 70]},
                {name: "Calcio acetato", register: "09 de nov. de 2010", isp: "F-11987/12", provider: "Grünenthal Chilena Ltda.", left: 0, expiration: "08 de ago. de 2019", formule: ["Solución inyectable", "500mg"], state: [0, 90]},
                {name: "Calcio acetato", register: "16 de dic. de 2010", isp: "F-13956/12", provider: "Seven Pharma Chile", left: 0, expiration: "16 de en. de 2019", formule: ["Solución inyectable", "2,34mg"], state: [0, 100]},
            ]
        }
    },
    mounted() {
        this.fuse = new Fuse(this.expired, this.fuseOptions);
    },
    computed: {
        filteredExpired() {
            if (this.query.length > 0) {
                return this.fuse.search(this.query);
            }
            return this.expired;
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