<template>
  <div id="app">
    <current-song 
      :song="currentSong" 
      v-if="currentSong"
    />
    <song-list 
      :songs="songList"
      :currentSong="currentSong"
      @handlePlay="handlePlay"
      @handleDelete="handleDelete"
    />
  </div>
</template>

<script>
import CurrentSong from './components/CurrentSong'
import SongList from './components/SongList'
//import _ from 'lodash'
//import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'app',
  data() {
    return {
      audioElement: null
    }
  },
  computed: {
    ...mapState(['songList', 'currentSong'])
  },
  methods: {
    handlePlay: function(song){
      
      if (this.audioElement == null){
        this.audioElement = new Audio(song.music_url)
        this.audioElement.play()
      } else {
        if (song == this.currentSong) {
          if (this.audioElement.paused){
            this.audioElement.play()
          } else {
            this.audioElement.pause()
          }
        } else {
          this.audioElement.src = song.music_url
          this.audioElement.play()
        }
      }
      this.$store.dispatch('setCurrentSong', song)
      this.audioElement.addEventListener('ended', () => {
        this.$store.dispatch('setCurrentSong', null)
        this.audioElement = null
      })
    },
    handleDelete: function(song){
      this.$store.dispatch('deleteSong', song)
    }
  },
  created() {
    this.$store.dispatch('fetchSongs')
    // axios({
    //   method: 'get',
    //   url: 'http://orangevalleycaa.org/api/music/',
    //   params: { order: 'name'}
    // })
    // .then(res => (this.songList = res.data))
    // .catch(error => console.log(error))

    // fetch('./data.json')
    //   .then(res => res.json())
    //   .then(res => {
    //     this.songList = res
    //   })
    //   .catch(error => console.log(error))
  },
  components: {
    CurrentSong,
    SongList
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Fjalla+One|Open+Sans:300&display=swap');
// colors
$primary: #00adb5;
$secondary: #f8b500;
$body-bg: #2a2d33;
$text-body: #fff;
$body-color: $text-body;
$border-radius: 8px;

//overrides

$font-family-headlines: 'Fjalla One', -apple-system, BlinkMacSystemFont,
  'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';
$font-family-base: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
  'Roboto', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol';

$headings-font-family: $font-family-headlines;
$headings-font-weight: 400;
$line-height-base: 1.4;

$list-group-active-bg: #222;
$list-group-bg: transparent;
$list-group-border-radius: 0;
$list-group-hover-bg: #444;
$list-group-action-color: #bbb;

@import 'node_modules/bootstrap/scss/bootstrap';

//currentsong
.currentsong-background {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.currentsong-backgroundimage {
  height: 100%;
  width: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(8px) grayscale(50%);
  transform: scale(1.15);
}

.currentsong .song-info {
  background-color: #000;
}

.currentsong .song-name {
  font-size: 2.5em;
}
.currentsong .song-description {
  font-size: 0.9em;
  line-height: 120%;
}

// SongList
.songlist .song:active {
  background: $gray-700;
}

.songlist .song-info-name {
  font-size: 1.3em;
  color: $gray-400;
}

.songlist .song-info-creator {
  font-size: 0.9em;
}

.songlist .thumbnail {
  width: 60px;
  height: 60px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}

.songlist .song .duration {
  color: $secondary;
}

.songlist .song .trash {
  display: none;
}

.songlist .song:not(.active):hover .trash {
  display: block;
  cursor: pointer;
}

.songlist .song .play,
.songlist .song:hover.active .play {
  display: none;
}
.songlist .song:hover .play {
  display: block;
  cursor: pointer;
}
.songlist .song .pause {
  display: none;
}

.songlist .song:hover.active .pause {
  display: block;
  cursor: pointer;
}

.songlist .song.active .play,
.songlist .song.active {
  display: block;
}
</style>
