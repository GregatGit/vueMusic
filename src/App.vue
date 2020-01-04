<template>
  <div id="app" class="container">
    <h1 class="text-primary mt-3">Music App</h1>
    <p><font-awesome-icon icon="play" /> Modern Hard Rock</p>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'app',
  components: {
    FontAwesomeIcon,
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Fjalla+One|Open+Sans:300&display=swap');
$primary: rgb(182, 80, 182);
$body-bg: #2a2d33;
$text-body: #fff;
$body-color: $text-body;
@import 'node_modules/bootstrap/scss/bootstrap';
</style>
