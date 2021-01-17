<template>
  <v-card>
    <v-img
      :height="isFirst ? 475 : 320"
      :src="imageUrl"
    />

    <v-card-title v-text="title"/>

    <v-card-text>
      <p v-text="description"/>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-ticket</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ countTickets }}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-calendar</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ startingAt }}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-timer</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ duration }}</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-timer-sand</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ ticketsLeft }}</v-list-item-subtitle>
      </v-list-item>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="primary"
        text
        v-text="buyTicketLabel"
        @click="buyTicket()"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  props: {
    event: {
      type: Object
    },
    isFirst: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      loaded: {
        balance: false,
        totalSupply: false
      },
      myTickets: 0,
      ticketsSold: 0
    }
  },

  computed: {
    ...mapGetters({
      address: 'auth/address'
    }),
    loading: function () {
      return Object.values(this.loaded).indexOf(false) > -1
    },
    ticketOffice: function () {
      return this.event[0]
    },
    title: function () {
      return this.event[1]
    },
    description: function () {
      return this.event[2]
    },
    imageUrl: function () {
      return this.event[3]
    },
    symbol: function () {
      return this.event[4]
    },
    ticketCost: function () {
      return this.event[5]
    },
    startingAt: function () {
      return moment(parseInt(this.event[6])).format('[Start at] MMMM Do [at] h:mm a')
    },
    duration: function () {
      return moment.utc(this.event[7] * 1000).format('[Duration] HH:mm')
    },
    maxTickets: function () {
      return this.event[8]
    },
    ticketCostInEther: function () {
      return this.$web3.utils.fromWei(this.ticketCost, 'ether')
    },
    countTickets: function () {
      if (this.loading) {
        return 'Counting your tickets. Please, wait...'
      }
      const suffix = (this.myTickets === '1' ? '' : 's') +
        (this.myTickets === '0' ? '.' : '!')
      return `You have ${this.myTickets} ticket${suffix}`
    },
    buyTicketLabel: function () {
      return `Buy ticket for ${this.ticketCostInEther}Ξ`
    },
    ticketsLeft: function () {
      return this.loading
        ? 'Counting the rest of tickets...'
        : `Only ${this.maxTickets - this.ticketsSold} tickets left`
    }
  },

  created () {
    /*
     * TODO: There is strange bug - any web3 request returns 0
     * when fired less then 1 sec after component created.
     */
    setTimeout(async () => {
      await this.init()
    }, 1000)
  },

  methods: {
    getMyTickets: async function () {
      this.myTickets = await this.$store.dispatch('getMyTickets', this.ticketOffice)
      this.loaded.balance = true
    },
    getTotalSupply: async function () {
      this.ticketsSold = await this.$store.dispatch('getTotalSupply', this.ticketOffice)
      this.loaded.totalSupply = true
    },
    init: async function () {
      await this.getMyTickets()
      await this.getTotalSupply()
    },
    buyTicket: async function () {
      await this.$store.dispatch('buyTicket', {
        address: this.ticketOffice,
        value: this.ticketCost
      })
    }
  }
}
</script>
