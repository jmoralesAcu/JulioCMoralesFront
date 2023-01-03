<template>
<v-row>
  <v-col cols="4" class="offset-md-4">
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="GetPersonaToEdit.nombre" :rules="textoRules" label="Nombre" required></v-text-field>
    <v-text-field v-model="GetPersonaToEdit.apellidoPaterno" :rules="textoRules" label="Apellido Paterno" required></v-text-field>
    <v-text-field v-model="GetPersonaToEdit.apellidoMaterno" :rules="textoRules" label="Apellido Materno" required></v-text-field>
    <v-text-field v-model="GetPersonaToEdit.email" :rules="textoRules" label="Email" required></v-text-field>
    <v-text-field v-model="GetPersonaToEdit.telefono" :rules="telefonoRules" label="Telefono" required></v-text-field>

    <v-btn v-if="GetPersonaToEdit.id" :disabled="!valid" color="primary" class="mr-4" @click="ActualizarCambios"> Actualizar </v-btn>
    <v-btn v-if="GetPersonaToEdit.id" color="red" class="mr-4" @click="Eliminar"> Eliminar </v-btn>
    <v-btn v-else :disabled="!valid" color="primary" class="mr-4" @click="GuardarCambios"> Guardar </v-btn>
    <v-btn color="warning" class="mr-4" @click="reset"> Borrar Formuario </v-btn>
  </v-form>
  </v-col>
</v-row>
  
</template>

<script>
export default {
  data: () => ({
    valid: true,
    person: {}, 
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    email: '',
    telefono: '',
    textoRules: [
      (v) => !!v || 'Este campo es requerido',
      (v) => (v && v.length > 2) || 'Debe contener al menos 5 caracteres'
    ],
    telefonoRules: [(v) => !!v || 'Este campo es requerido', (v) => !!v && v.length == 10 || 'Debe tener 10 caracteres']
  }),
  computed: {
    GetPersonaToEdit() {
      return this.$store.getters.GetPersona
    }
  },
  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$store.dispatch('SetPersona', {})
      this.$refs.form.reset()
    },
    ActualizarCambios() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('ActualizarCambios', {
            id: this.GetPersonaToEdit.id,
            nombre: this.GetPersonaToEdit.nombre,
            apellidoPaterno: this.GetPersonaToEdit.apellidoPaterno,
            apellidoMaterno: this.GetPersonaToEdit.apellidoMaterno,
            email: this.GetPersonaToEdit.email,
            telefono: this.GetPersonaToEdit.telefono
          })
          .then((resp) => {
            this.$refs.form.reset()
            console.log('Response:', resp)
          })
          .then(() => {
            this.$store.dispatch('GetPersonasAsync')
          })
      }
    },
    GuardarCambios() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('GuardarCambios', {
            nombre: this.GetPersonaToEdit.nombre,
            apellidoPaterno: this.GetPersonaToEdit.apellidoPaterno,
            apellidoMaterno: this.GetPersonaToEdit.apellidoMaterno,
            email: this.GetPersonaToEdit.email,
            telefono: this.GetPersonaToEdit.telefono
          })
          .then((resp) => {
            console.log('Response:', resp)
            if (!resp.error) {
              this.$refs.form.reset()
            }
          })
          .then(() => {
            this.$store.dispatch('GetPersonasAsync')
          })
      }
    },
    Eliminar() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch('Delete', {
            id: this.GetPersonaToEdit.id
          })
          .then((resp) => {
            console.log('Response:', resp)
            if (!resp.error) {
              this.$refs.form.reset()
            }
          })
          .then(() => {
            this.$store.dispatch('GetPersonasAsync')
          })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
