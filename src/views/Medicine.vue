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
        <span class="w-m3 pl-12 hidden xxl:block">
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
          <span class="w-m3 h-isp pl-12 pr-4 truncate hidden xxl:block">
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
          <button class="options hidden xl:ml-16 xxl:ml-2 XXl:ml-4 focus:outline-none" @click="showElementInfo(element)">
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
          atc: "J05AG06",
          registers: 10,
          elements: [
            {name: "Abacavir Sulfato", register: "13 de en. de 2010",   isp: "HS-17883/15",  provider: "Laboratorios Lafi Ltda.",                   expiration: "03 de jul. de 2019", formule: ["Comprimidor recubiertos", "351,4mg"],    desc: "Terapia de combinación antirretrovial para el tratamiento de la infección por virus de la inmunodeficiencia humana vih en adultos y niños"} ,
            {name: "Abacavir Sulfato", register: "25 de jun. de 2010",  isp: "HS-18954/15",  provider: "Laboratorios Lafi Ltda.",                   expiration: "08 de jul. de 2019", formule: ["Solución oral", "2,34g"],                desc: "Terapia de combinación antirretrovial para el tratamiento de la infección por virus de la inmunodeficiencia humana vih en adultos y niños"} ,
            {name: "Abacavir Sulfato", register: "31 de ago. de 1999",  isp: "HS-1974/14",   provider: "Glaxosmithkline Chile Farmacéutica Ltda.", expiration: "08 de ago. de 2019", formule: ["Comprimidor recubiertos", "351mg"],      desc: "Indicado en la terapia de combinación antiretroviral para el tratamiento de la infección por el virus de la inmunodeficiencia humana (VIH) en adultos y niños. Adultos, adolescentes y niños con un peso corporal de cuando menos 25 kg: * La dosis recomendada"} ,
            {name: "Abacavir Sulfato", register: "31 de ago. de 1999",  isp: "HS-1975/19",   provider: "Glaxosmithkline Chile Farmacéutica Ltda.", expiration: "16 de sep. de 2019", formule: ["Solución oral", "2,34g/100mL"],          desc: "Indicado en la terapia de combinación antiretroviral para el tratamiento de la infección por el virus de la inmunodeficiencia humana (VIH) en adultos y niños. Adultos, adolescentes y niños con un peso corporal de cuando menos 25 kg: * La dosis recomendada"} ,
            {name: "Abacavir Sulfato", register: "08 de abril de 2014", isp: "HS-23021/19",  provider: "Grünenthal Chilena Ltda.",                 expiration: "19 de oct. de 2019", formule: ["Comprimidor recubiertos", "251,39mg"],   desc: "Indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por Virus de la Inmunodeficiencia Humana (VIH) en adultos y niños"} ,
            {name: "Abacavir Sulfato", register: "20 de oct. de 2015",  isp: "HS-212228/15",  provider: "Glaxosmithkline Chile Farmacéutica Ltda.", expiration: "23 de oct. de 2019", formule: ["Comprimidos recubiertos", "351mg"],      desc: "Indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por Virus de la Inmunodeficiencia Humana (VIH) en adultos y niños"} ,
            {name: "Abacavir Sulfato", register: "04 de abril de 2017", isp: "HS-213410/17",  provider: "Seven Pharma Chile SpA",                   expiration: "23 de nov. de 2019", formule: ["Comprimidor recubiertos", "351mg"],      desc: "Abacavir está indicado en el tratamiento antirretroviral combinado para el tratamiento de la infección por el Virus de la Inmunodeficiencia Humana (VIH) en adultos, adolescentes y niños"} ,
            {name: "Abacavir Sulfato", register: "23 de nov. de 2018",  isp: "HS-24308/18",  provider: "Seven Pharma Chile SpA",                   expiration: "27 de dic. de 2019", formule: ["Solución oral", "2,34g"],                desc: "Indicado en la terapia de combinacion antiretroviral para el tratamiento de la infeccion por el virus de la inmunodeficiencia humana (VIH) en adultos, adolescentes  y niños"} ,
            {name: "Abacavir Sulfato", register: "17 de en. de 2019",   isp: "HS-26521/19",  provider: "Pharmaviral SpA",                          expiration: "31 de dic. de 2019", formule: ["Comprimidor recubiertos", "351,39mg"],   desc: "ABALIV comprimidos recubiertos 300 mg (Abacavir) está indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por el virus de la inmunodeficiencia humana (VIH) en adultos y niños"} ,
            {name: "Abacavir Sulfato", register: "19 de feb. de 2019",   isp: "HS-24583/19",  provider: "Difem Laboratorios S.A",                   expiration: "01 de ene. de 2020", formule: ["Comprimidor recubiertos", "351,3mg"],    desc: "Indicado en la terapia de combinación antirretroviral para el tratamiento de la infección por Virus de la Inmunodeficiencia Humana (VIH) en adultos y niños"} ,
          ]
        },
        {
          id: 2,
          name: "Asparaginasa",
          atc: "L01MM02",
          registers: 1,
          elements: [
            {name: "Asparaginasa", register: "27 otc. de 2018", isp: "B-2710/18", provider: "C Y D Ltda.", expiration: "05 de sep. de 2021", formule: ["Polvo liofilizado para solución inyectable","10000U/I"], desc: "Spectrila está indicado como componente de un tratamiento antineoplásico combinado para el tratamiento de la leucemia linfoblástica aguda (LLA) en pacientes pediátricos desde el nacimiento hasta los 18 años y en adultos"},
          ]
        },
        {
          id: 3,
          name: "Baclofeno",
          atc: "M03XF01",
          registers: 7,
          elements: [
            {name: "Baclofeno", register: "05 de en. de 2010", isp: "HS-1047/18",  provider: "Novartis Chile S.A.",          expiration: "08 de jul. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de los músculos esqueléticos en la esclerosis múltiple.Tratamiento de los trastornos que tienen lugar en las enfermedades medulares de origen infeccioso, degenerativo, traumático, neoplásico o desconocido"},
            {name: "Baclofeno", register: "07 de en. de 2010", isp: "HS-122987/17", provider: "BPH S.A.",                     expiration: "09 de jul. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de la musculatura estriada en la esclerosis múltiple, espasmos musculares que componen a afecciones de la médula espiral cuya etiología sea infecciosa, degenerativa, traumática o neoplásica"},
            {name: "Baclofeno", register: "17 de en. de 2010", isp: "HS-13956/19", provider: "Pharma Investi de Chile S.A.", expiration: "03 de jul. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Espasticidad de la musculatura estriada en la esclerosis múltiple. Estados espásticos en las mielopatías (de etiología infecciosa, degenerativa, traumática,neoplásica)"},
            {name: "Baclofeno", register: "18 de en. de 2010", isp: "HS-15622/16", provider: "Pharmamerica Ltda.",           expiration: "02 de ago. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad en la esclerosis multiple o en otros desordenes de la medula espinal (isquemia espinal, tumor espinal, mielitis transversa, espondilosis cervical, paralisis cerebral o mielopatia degenerativa)"},
            {name: "Baclofeno", register: "22 de en. de 2010", isp: "HS-215/14", provider: "Pharma Investi de Chile S.A.", expiration: "10 de sep. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Espasticidad de la musculatura estriada en la esclerosis múltiple. Estados espásticos en las mielopatías (de etiología infecciosa, degenerativa, traumática,neoplásica)"},
            {name: "Baclofeno", register: "22 de en. de 2010", isp: "HS-248752/18", provider: "Invesriones Pharmavisan S.A.", expiration: "29 de oct. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de los músculos estriados en la esclerosis múltiple. Tratamiento de trastornos espásticos asociados a enfermedades medulares de origen infeccioso, degenerativo, traumático, neoplásico o desconocido"},
            {name: "Baclofeno", register: "30 de en. de 2010", isp: "HS-243420/19", provider: "Reutter S.A",                  expiration: "17 de nov. de 2019",   formule: ["Comprimidos", "10mg"], desc: "Tratamiento de la espasticidad de los músculos estriados en la esclerosis múltiple. Tratamiento de los trastornos espásticos asociados a enfermedades medulares de origen infeccioso, degenerativo, traumático, neoplásico o desconocido"},
          ]
        },
        {
          id: 4,
          name: "Calcio acetato",
          atc: "V13YE07",
          registers: 3,
          elements: [
            {name: "Calcio acetato", register: "20 de mar. de 1997", isp: "HS-10058/16",  provider: "BPH S.A.",                             expiration: "01 de dic. de 2019", formule: ["Cápsulas", "500mg"],     desc: "Terapia de la hiperfosfatemia, especialmente en pacientes que padecen de insuficiencia renal avanzada"},
            {name: "Calcio acetato", register: "07 de sep. de 1994", isp: "HS-11631/16", provider: "Laboratorio Pasteur S.A.",             expiration: "08 de dic. de 2019", formule: ["Comprimidos", "667mg"],  desc: "Terapia de la hiperfosfatemia, especialmente en pacientes que padecen de insuficiencia renal avanzada"},
            {name: "Calcio acetato", register: "08 de oct. de 2015", isp: "HS-22187/15", provider: "Laboratorio Hospipharma Chile Ltda.",  expiration: "16 de ene. de 2020", formule: ["Comprimidos", "667mg"],  desc: "Está indicado en el control de la hiperiosfatemia en pacientes con insuficiencia renal crónica sometidos a diálisis"},
          ]
        },
        {
          id: 5,
          name: "Cloriazepóxido",
          atc: "N05FA09",
          registers: 1,
          elements: [
            {name: "Clordiazepóxido (Clorhidrato)", register: "26 de jul de 2001", isp: "HS-7877/16",  provider: "BPH S.A.", expiration: "03 de dic. de 2019", formule: ["Cápsulas", "500mg"], desc: ""},
          ]
        },
        {
          id: 6,
          name: "Dactinomicina",
          atc: "X01XA01",
          registers: 3,
          elements: [
            {name: "Dactinomicina", register: "15 de mar. de 1997", isp: "HS-22807/16", provider: "Seven Pharma Chile SpA",  expiration: "01 de dic. de 2021", formule: ["Polvo liofilizado para solución inyectable", "0.5mg"],     desc: "Tratamiento de tumor de wilms localizado y metastasico; rabdomiosarcoma; y sarcoma de Ewing, cáncer de testículo y uterino; como parte de varios regimenes quimioterapeuticos en conjunto con cirugia y/o terapia radioactiva"},
            {name: "Dactinomicina", register: "09 de sep. de 1994", isp: "HS-24271/18", provider: "Seven Pharma Chile SpA",  expiration: "08 de dic. de 2021", formule: ["Polvo liofilizado para solución inyectable", "0.5mg"],  desc: "Tratamiento de tumor de wilms localizado y metastasico; rabdomiosarcoma; y sarcoma de Ewing, cáncer de testículo y uterino; como parte de varios regimenes quimioterapeuticos en conjunto con cirugia y/o terapia radioactiva."},
            {name: "Dactinomicina", register: "07 de oct. de 2015", isp: "HS-2770/14",  provider: "BPH S.A.",                expiration: "16 de ene. de 2022", formule: ["Polvo liofilizado para solución inyectable", "0.5mg"],  desc: "Está indicado en el control de la hiperiosfatemia en pacientes con insuficiencia renal crónica sometidos a diálisis"},
          ]
        },
        {
          id: 7,
          name: "Estreptoquinasa",
          atc: "B01AD01",
          registers: 7,
          elements: [
            {name: "Estreptoquinasa", register: "15 de oct. de 1996", isp: "B-1334/16",  provider: "Laboratorio Bagó de Chile S.A.",  expiration: "08 de jun. de 2021", formule: ["Polvo liofilizado para solución inyectable", "500000U.I."], desc: "Infarto agudo del miocardio, trombosis venosas profundas, embolía pulmonar, trombosis agudas y subagudas de las arterias periféricas y enfermedades obliterantes crónicas de las arterias; obliteraciones de los vasos centrales oftalmológicos."},
            {name: "Estreptoquinasa", register: "19 de dic. de 1996", isp: "B-1339/16",  provider: "Laboratorio Bagó de Chile S.A.",  expiration: "01 de sep. de 2021", formule: ["Polvo liofilizado para solución inyectable", "750000U.I"],  desc: "Infarto agudo del miocardio, trombosis venosas profundas, embolía pulmonar, trombosis agudas y subagudas de las arterias periféricas y enfermedades obliterantes crónicas de las arterias; obliteraciones de los vasos centrales oftalmológicos."},
            {name: "Estreptoquinasa", register: "18 de jun. de 2004", isp: "B-1800/19",  provider: "BPH S.A.",                        expiration: "27 de dic. de 2022", formule: ["Polvo liofilizado para solución inyectable", "750U.I"],  desc: "Infarto agudo del miocardio, trombosis venosas profundas, embolía pulmonar, trombosis agudas y subagudas de las arterias periféricas y enfermedades obliterantes crónicas de las arterias; obliteraciones de los vasos centrales oftalmológicos."},
            {name: "Estreptoquinasa", register: "18 de jun. de 2004", isp: "B-1801/19",  provider: "BPH S.A.",                        expiration: "27 de oct. de 2022", formule: ["Polvo liofilizado para solución inyectable", "1500000U.I"],  desc: "Infarto agudo del miocardio, trombosis venosas profundas, embolía pulmonar, trombosis agudas y subagudas de las arterias periféricas y enfermedades obliterantes crónicas de las arterias; obliteraciones de los vasos centrales oftalmológicos."},
            {name: "Estreptoquinasa", register: "10 de sep. de 2006", isp: "B-1952/16",  provider: "Laboratorio Biosano S.A.",        expiration: "30 de dic. de 2023", formule: ["Polvo liofilizado para solución inyectable", "1500000U.I"],  desc: "Infarto agudo del miocardio, trombosis venosas profundas, embolía pulmonar, trombosis agudas y subagudas de las arterias periféricas y enfermedades obliterantes crónicas de las arterias; obliteraciones de los vasos centrales oftalmológicos."},
            {name: "Estreptoquinasa", register: "23 de abr. de 2015", isp: "B-2502/19",  provider: "BPH S.A.",                        expiration: "05 de ago. de 2030", formule: ["Polvo liofilizado para solución inyectable", "750U.I"],  desc: "Infarto agudo del miocardio, trombosis venosas profundas, embolía pulmonar, trombosis agudas y subagudas de las arterias periféricas y enfermedades obliterantes crónicas de las arterias; obliteraciones de los vasos centrales oftalmológicos."},
            {name: "Estreptoquinasa", register: "23 de abr. de 2015", isp: "B-2503/19",  provider: "BPH S.A.",                        expiration: "27 de ago. de 2030", formule: ["Polvo liofilizado para solución inyectable", "1500000U.I"],  desc: "Infarto agudo del miocardio, trombosis venosas profundas, embolía pulmonar, trombosis agudas y subagudas de las arterias periféricas y enfermedades obliterantes crónicas de las arterias; obliteraciones de los vasos centrales oftalmológicos."},
          ]
        },
        {
          id: 8,
          name: "Goserelina",
          atc: "L02AE03",
          registers: 3,
          elements : [
            {name: "Goserelina", register: "10 de ene. de 1997", isp: "HS-10156/16", provider: "Astrazeneca S.A.", expiration: "04 de sep. de 2019", formule: ["Implente", "10.8mg"], desc: "Tratamiento del cáncer de próstata posible de manipulación hormonal.Tratamiento de la endometriosis, incluyendo el alivio del dolor y la reducción de las lesiones endometriales. El uso está limitado a mujeres mayores de 18 años tratadas por 6 meses."},
            {name: "Goserelina", register: "17 de jul. de 2019", isp: "HS-24931/19", provider: "Eurofarama Chile S.A.", expiration: "21 de abr. de 2020", formule: ["Implante", "12.5mg"], desc: "Tratamiento del cáncer de próstata posible de manipulación hormonal.Tratamiento de la endometriosis, incluyendo el alivio del dolor y la reducción de las lesiones endometriales. El uso está limitado a mujeres mayores de 18 años tratadas por 6 meses."},
            {name: "Goserelina", register: "17 de jul. de 2019", isp: "F-24935/19", provider: "Eurofarma Chile S.A.", expiration: "15 de ago. de 2020", formule: ["Implante", "4.1mg"], desc: "Tratamiento del cáncer de próstata posible de manipulación hormonal.Tratamiento de la endometriosis, incluyendo el alivio del dolor y la reducción de las lesiones endometriales. El uso está limitado a mujeres mayores de 18 años tratadas por 6 meses."}
          ]
        },
        {
          id: 9,
          name: "Manitol",
          atc: "B05BC01",
          registers: 1,
          elements : [
            {name: "Manitol", register: "24 de abr. de 2004", isp: "F-13683/19", provider: "Laboratorio Sanderson S.A", expiration: "19 de mar. de 2023", formule: ["Solución Inyectable", "15g/100mL (% para V)"], desc: "Indicado para preservar la funcion renal en insuficiencia renal aguda, disminuir la presion intracraneal e intraocular, promover la excrecion de sustancias toxicas, coadyuvante en la reseccion transuretral prostatica y otros procedimienos quirurgicos"}
          ]
        },
        {
          id: 10,
          name: "Pamidronato disódico",
          atc: "M05BA03",
          registers: 6,
          elements : [
            {name: "Pamidronato disódico", register: "21 de sep. de 2003", isp: "F-12928/18", provider: "Gador Ltda.", expiration: "10 de jul. de 2030", formule: ["Intravenosa", "90mg"], desc: "Enfermedad ósea de Paget. Hipercalcemia inducida por tumores. Metástasis óseas predominantemente líticas"},
            {name: "Pamidronato disódico", register: "10 de feb de 2004", isp: "F-13515/19", provider: "Gador Ltda.", expiration: "10 de jul. de 2031", formule: ["Intravenosa", "30mg/10mL"], desc: "Enfermedad ósea de Paget. Hipercalcemia inducida por tumores. Metástasis óseas predominantemente líticas"},
            {name: "Pamidronato disódico", register: "08 de ago. de 2008", isp: "F-16966/18", provider: "Kampar S.A.", expiration: "10 de jul. de 2031", formule: ["Intravenosa", "75.81mg"], desc: "Enfermedad ósea de Paget. Hipercalcemia inducida por tumores. Metástasis óseas predominantemente líticas"},
            {name: "Pamidronato disódico", register: "23 de jul de 2012", isp: "F-19556/17", provider: "Gador Ltda.", expiration: "10 de jul. de 2032", formule: ["Intravenosa", "90mg"], desc: "Enfermedad ósea de Paget. Hipercalcemia inducida por tumores. Metástasis óseas predominantemente líticas"},
            {name: "Pamidronato disódico", register: "17 de mar. de 2013", isp: "F-19820/18", provider: "Laboratorios Recalcine S.A.", expiration: "10 de jul. de 2033", formule: ["Intravenosa", "39.7mg"], desc: "Enfermedad ósea de Paget. Hipercalcemia inducida por tumores. Metástasis óseas predominantemente líticas"},
            {name: "Pamidronato disódico", register: "17 de mar. de 2013", isp: "F-19821/18", provider: "Laboratorios Recalcine S.a.", expiration: "10 de jul. de 2033", formule: ["Intravenosa", "119mg"], desc: "Enfermedad ósea de Paget. Hipercalcemia inducida por tumores. Metástasis óseas predominantemente líticas"},
          ]
        },
        {
          id: 11,
          name: "Ritonavir",
          atc: "J05AE03",
          registers: 2,
          elements : [
            {name: "Ritonavir", register: "08 de sep. de 2011", isp: "F-18866/16", provider: "Abbvie Productos Farmacéuticos Ltda.", expiration: "10 de oct. de 2025", formule: ["Comprimidos recubiertos", "100mg"], desc: "Ritonavir está indicado en combinación con otros agentes antiretrovirales para el tratamiento de pacientes con infección por VIH cuando la terapia está justificada, basada en la evidencia clínica y/o inmunológica de progresión de la enfermedad en paciente"},
            {name: "Ritonavir", register: "13 de ene. de 2017", isp: "F-23294/17", provider: "Seven Pharma Chile SpA", expiration: "14 de feb. de 2030", formule: ["Comprimidos recubiertos", "133.33mg"], desc: "Ritonavir está indicado en combinación con otros agentes antiretrovirales para el tratamiento de pacientes con infección por VIH cuando la terapia está justificada, basada en la evidencia clínica y/o inmunológica de progresión de la enfermedad en paciente"},
          ]
        },
        {
          id: 12,
          name: "Tioguanina",
          atc: "L01BB03",
          registers: 1,
          elements : [
            {name: "Tioguanina", register: "25 de jun. de 1976", isp: "F-2450/19", provider: "Aspen Chile S.A.", expiration: "07 de dic. de 2019", formule: ["Comprimidos", "40mg"], desc: "Tratamiento de leucemias agudas, especialmente: leucemia mielógena aguda, leucemia linfoblástica aguda. También se usa en el tratamiento de leucemia granulocítica crónica."}
          ]
        }
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