import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    personas: [],
    dialog: false,
    persona: {},
    baseURL: 'http://localhost:47992/api/Personas'
  },
  getters: {
    GetPersonas(state) {
      return state.personas
    },
    GetPersona(state) {
      return state.persona
    }
  },
  mutations: {
    SET_PERSONAS(state, payload) {
      state.personas = payload
    },
    SET_PERSONA(state, payload) {
      state.persona = payload
    }
  },
  actions: {
    GetPersonasAsync({ commit, state }) {
      return axios
        .get(state.baseURL)
        .then((data) => {
          commit('SET_PERSONAS', data.data)
        })
        .catch((error) => {
          console.log({ error })
          return { error }
        })
    },
    GuardarCambios({ state }, payload) {
      return axios
        .post(state.baseURL, payload)
        .then((data) => {
          console.log(state.personas)
          return data.data
        })
        .catch((error) => {
          console.log({ error })
          return { error }
        })
    },
    ActualizarCambios({ state }, payload) {
      return axios
        .put(state.baseURL + "/" + payload.id, payload)
        .then((data) => {
          console.log(state.personas)
          return data.data
        })
        .catch((error) => {
          console.log({ error })
          return { error }
        })
    },
    Delete({ state, commit }, payload) {
      return axios
        .delete(state.baseURL + "/" + payload.id, payload)
        .then(() => {
          console.log(state.personas)
          var personas = state.personas.filter(x => x.id != payload.id)
          commit('SET_PERSONAS', personas)
          return true
        })
        .catch((error) => {
          console.log({ error })
          return { error }
        })
    },
  

    SetPersona({ commit }, payload) {
      commit('SET_PERSONA', payload)
    }
  },
  modules: {}
})
