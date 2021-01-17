<template>
  <v-app-bar
    app
    large
  >
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        :src="require('./../assets/logo.svg')"
        transition="scale-transition"
        width="200"
      />
    </div>
    <v-spacer/>
    <v-col class="text-right" v-text="$store.getters['auth/shortAddress']"/>
    <create-event/>
  </v-app-bar>
</template>

<script>
import CreateEvent from '@/components/CreateEvent'

export default {
  components: {
    CreateEvent
  }
}
</script>
