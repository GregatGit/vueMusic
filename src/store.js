import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songList: [],
    currentSong: null,
  },
  mutations: {
    SET_SONGS(state, payload) {
      state.songList = payload
    },
  },
  actions: {
    fetchSongs({ commit }) {
      axios({
        method: 'get',
        url: 'http://orangevalleycaa.org/api/music/',
        params: { order: 'name' },
      })
        .then(res => (commit('SET_SONGS', res.data)))
        .catch(error => console.log(error))
    },
  },
})
