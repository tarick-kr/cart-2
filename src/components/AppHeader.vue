<template>
  <v-app-bar app color="primary" dark class="px-10">
    <router-link to="/" tag="span" style="cursor:pointer">
      <v-toolbar-title class="font-weight-bold display-1" v-text="'Бла-бла'"/>
    </router-link>
  <v-spacer/>
  <div>
    <v-icon size="30" class="v-icon--center mr-4">shopping_cart</v-icon>
    <span class="subtitle-1">{{ cartCount }}</span>
  </div>
</v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters([
      'cartCount'
    ])
  }
}
</script>

<style scoped>

</style>
