<template>
  <div class="pa-10">
    <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    <v-data-table
      class="table ma-auto"
      item-key="personaId"
      fixed-header
      fixed-footer
      :headers="headers"
      :items="GetPersonas"
      height="400"
      multi-sort
      style="width: 100%"
      :search="search"
    >
      <template v-slot:[`item.nombre`]="{ item }" class="pa-0">
        <span class="caption text-uppercase">
          <v-btn text @click="EditarPersona(item)"> {{ item.nombre }}</v-btn>
        </span>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    search: ''
  }),
  computed: {
    headers() {
      return [
        { text: 'Nombre', value: 'nombre' },
        { text: 'Id', value: 'id', align: ' d-none' },
        { text: 'ApellidoPaterno', value: 'apellidoPaterno' },
        { text: 'ApellidoMaterno', value: 'apellidoMaterno' },
        { text: 'Email', value: 'email' },
        { text: 'Telefono', value: 'telefono' }
      ]
    },
    GetPersonas() {
      return this.$store.getters.GetPersonas
    }
  },
  methods: {
    EditarPersona(item) {
      this.$store.dispatch('SetPersona', item)
    }
  },
  mounted() {
    this.$store.dispatch('GetPersonasAsync')
  }
}
</script>

<style scoped></style>
