<template>
  <div id="app" class="h-screen w-screen flex antialiased">
    <sidebarcomponent/>
    <router-view/>
  </div>
</template>

<script>
import sidebarcomponent from "@/components/SidebarComponent.vue"

export default {
  components: {
    sidebarcomponent
  }
}
</script>

<style>
@font-face {
	 font-family: 'SFProText';
	 src: url('./assets/fonts/SFPro/sf-pro-text-bold.eot');
   src: url('./assets/fonts/SFPro/sf-pro-text-bold.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/SFPro/sf-pro-text-bold.woff') format('woff'),
        url('./assets/fonts/SFPro/sf-pro-text-bold.ttf') format('truetype'),
        url('./assets/fonts/SFPro/sf-pro-text-bold.svg#sf_pro_textbold') format('svg');
	 font-weight: 700;
	 font-style: normal;
}

@font-face {
	 font-family: 'SFProText';
	 src: url('./assets/fonts/SFPro/sf-pro-text-medium.eot');
   src: url('./assets/fonts/SFPro/sf-pro-text-medium.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/SFPro/sf-pro-text-medium.woff') format('woff'),
        url('./assets/fonts/SFPro/sf-pro-text-medium.ttf') format('truetype'),
        url('./assets/fonts/SFPro/sf-pro-text-medium.svg#sf_pro_textbold') format('svg');
	 font-weight: 500;
	 font-style: normal;
}

@font-face {
	 font-family: 'SFProText';
	 src: url('./assets/fonts/SFPro/sf-pro-text-light.eot');
   src: url('./assets/fonts/SFPro/sf-pro-text-light.eot?#iefix') format('embedded-opentype'),
        url('./assets/fonts/SFPro/sf-pro-text-light.woff') format('woff'),
        url('./assets/fonts/SFPro/sf-pro-text-light.ttf') format('truetype'),
        url('./assets/fonts/SFPro/sf-pro-text-light.svg#sf_pro_textbold') format('svg');
	 font-weight: 200;
	 font-style: normal;
}

.sf-bold {
  font-family: 'SFProText';
  font-weight: 700;
}

.sf-medium {
  font-family: 'SFProText';
  font-weight: 500;
}

.sf-light {
  font-family: 'SFProText';
  font-weight: 200;
}
</style>