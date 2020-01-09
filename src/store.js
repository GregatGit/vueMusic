import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

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
    SET_CURRENT_SONG(state, payload){
      state.currentSong = payload
    }
  },
  actions: {
    setCurrentSong({ commit }, payload){
      commit('SET_CURRENT_SONG', payload )
    },
    fetchSongs({ commit }) {
      axios({
        method: 'get',
        url: 'http://orangevalleycaa.org/api/music/',
        params: { order: 'name' },
      })
        .then(res => (commit('SET_SONGS', res.data)))
        .catch(error => console.log(error))
    },
    deleteSong({ commit }, payload){
      const updatedSongList = _.without(this.state.songList, payload)
      commit('SET_SONGS', updatedSongList)
    }
  },
})
