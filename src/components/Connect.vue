<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="340"
  >
    <v-card>
      <v-card-title class="headline">
        Metamask
      </v-card-title>
      <v-card-text>We need to connect to Ethereum <strong>Ropsten testnet</strong>.</v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="primary"
          text
          v-text="'Connect'"
          @click="$store.dispatch('auth/connect')"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    dialog: function () {
      return !this.$store.getters['auth/isAuthenticated']
    }
  }
}
</script>
