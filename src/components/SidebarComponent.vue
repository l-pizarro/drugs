<template>
  <div class="sidebarcomponent w-60 h-full bg-gray-700">
      <div class="w-full h-20 bg-gray-800"></div>
      <div class="mt-16 text-white sf-medium text-xl">
          <div v-for="(tab, index) in tabs" :key="index" class="flex">
              <button
              v-if="index == selected"
              class="w-full h-12 flex items-center text-left bg-gray-800 focus:outline-none"
              @click="goTo(index)">
                  <div class="w-1 h-12 bg-indigo-400"></div>
                  <span class="ml-4">{{tab.name}}</span>
              </button>
              <button
              v-else
              class="w-full h-12 flex items-center text-left focus:outline-none"
              @click="goTo(index)">
                  <div class="w-1 h-12"></div>
                  <span class="ml-4">{{tab.name}}</span>
              </button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name: 'sidebarcomponent',
    data() {
        return {
            selected: 0,
            tabs: [
                {name: "Medicamentos", route: '/'},
                {name: "Alertas", route: '/alertas'}
            ]
        }
    },
    created() {
        if (this.$route.path != '/') {
            this.selected = 1;
        }
    },
    methods: {
        goTo(index) {
            if (index != this.selected) {
                this.selected = index;
                this.$router.replace(this.tabs[this.selected].route);
            }
        }
    }
}
</script>

<style>

</style>