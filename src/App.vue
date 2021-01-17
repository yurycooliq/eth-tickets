<template>
  <v-app>
    <Navbar/>
    <v-main>
      <v-container class="mx-auto" max-width="800">
        <v-row dense>
          <v-col
            v-for="( event, i ) in $store.getters.allEvents"
            :key="i"
            :cols="i === 0 ? 12 : 6"
          >
            <Event :event="event" :is-first="i === 0"/>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Connect/>
    <v-snackbar v-model="greetings">
      {{ greetingsText }}
    </v-snackbar>
    <v-snackbar v-model="transaction">
      {{ transactionText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :href="transactionUrl"
          color="primary"
          text
          link
          target="_blank"
          v-bind="attrs"
        >
          View
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import Connect from '@/components/Connect'
import Event from '@/components/Event'
import Navbar from '@/components/Navbar'
import { mapGetters } from 'vuex'

export default {
  data: () => {
    return {
      greetings: false,
      greetingsText: ''
    }
  },

  components: {
    Connect, Event, Navbar
  },

  computed: {
    ...mapGetters({
      owner: 'auth/isOwner',
      transactionText: 'transactionText',
      transactionUrl: 'transactionUrl'
    }),
    transaction: {
      get: function () {
        return this.$store.getters.transaction
      },
      set: function (value) {
        this.$store.commit('setTransaction', value)
      }
    }
  },

  watch: {
    owner: function (isOwner) {
      this.greetingsText = isOwner
        ? 'Welcome back, Boss!'
        : 'Hello, NOT owner 😀'
      this.greetings = true
    }
  }
}
</script>
