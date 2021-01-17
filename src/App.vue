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
  </v-app>
</template>

<script>
import Connect from '@/components/Connect'
import Event from '@/components/Event'
import Navbar from '@/components/Navbar'

export default {
  components: {
    Connect, Event, Navbar
  }
}
</script>
