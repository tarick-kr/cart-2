<template>
  <v-app>
    <app-header/>
    <v-content class="light-blue lighten-5">
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

import AppHeader from './components/AppHeader'

export default {
  name: 'App',

  components: {
    AppHeader
  }
}
</script>
