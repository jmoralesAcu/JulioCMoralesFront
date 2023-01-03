<template>
  <div>
    <formulario class="pb-5"></formulario>
    <v-divider class="py-1"></v-divider>
    <br />
    <main-data></main-data>
  </div>
</template>

<script>
import Formulario from '../components/Formulario.vue'
import MainData from '../components/MainData.vue'
export default {
  name: 'Home',

  components: {
    Formulario,
    MainData
  }
}
</script>
