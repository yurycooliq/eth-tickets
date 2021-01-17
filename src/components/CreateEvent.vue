<template>
  <v-dialog
    v-model="dialog"
    max-width="600px"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        v-show="$store.getters['auth/isOwner']"
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        v-text="'Create Event'"
      />
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Create New Event</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="title"
                label="Title*"
                counter
                required
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                label="Description*"
                auto-grow
                counter
                rows="1"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="imageUrl"
                label="Image URL*"
                counter
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="ticketCostInput"
                label="Ticket Cost*"
                hint="In ether"
                required
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="symbol"
                label="Ticket Symbol*"
                counter
                required
              />
            </v-col>
            <v-col cols="4">
              <v-menu
                v-model="showDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="dateInput"
                    label="Date*"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="dateInput"
                  @input="showDatePicker = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="timeInput"
                label="Time*"
                :rules="timeRule"
                prepend-icon="mdi-clock-time-four-outline"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="durationInput"
                label="Duration*"
                :rules="timeRule"
                prepend-icon="mdi-timer-sand"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="maxTickets"
                label="Max Tickets*"
                :rules="maxTicketsRule"
                required
              />
            </v-col>
          </v-row>
        </v-container>
        <small>*required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
          color="red"
          text
          v-text="'Cancel'"
          @click="close()"
        />
        <v-btn
          color="primary"
          text
          v-text="'Save'"
          @click="save()"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'

const timeRegExp = new RegExp(/^([0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
const defaultSymbol = 'TICKET'

export default {
  data: () => ({
    title: '',
    description: '',
    imageUrl: '',
    date: moment().unix(),
    duration: 3600, // 1 hour
    ticketCost: 1e17, // 0.1 ether
    maxTickets: 1000,
    dialog: false,
    showDatePicker: false,
    showTimePicker: false,
    symbol: defaultSymbol,
    timeRule: [v => v.match(timeRegExp) != null || 'Invalid time!'],
    maxTicketsRule: [v => v > 0 || 'Invalid amount!']
  }),

  computed: {
    dateInput: {
      get: function () {
        return moment(this.date * 1000).toISOString().substr(0, 10)
      },
      set: function (newDate) {
        this.date = moment(newDate).unix()
      }
    },
    timeInput: {
      get: function () {
        return moment(this.date * 1000).format('H:mm')
      },
      set: function (time) {
        if (time.match(timeRegExp)) {
          const values = time.split(':')
          moment(this.date).minutes(values[0]).seconds(values[1])
        }
      }
    },
    durationInput: {
      get: function () {
        return moment.utc(this.duration * 1000).format('H:mm')
      },
      set: function (time) {
        if (time.match(timeRegExp)) {
          const values = time.split(':')
          moment.utc(this.duration).minutes(values[0]).seconds(values[1])
        }
      }
    },
    ticketCostInput: {
      get: function () {
        return this.$web3.utils.fromWei(this.ticketCost.toString(), 'ether')
      },
      set: function (value) {
        this.ticketCost = this.$web3.utils.toWei(value.toString())
      }
    }
  },

  methods: {
    reset: function () {
      this.title = this.description = this.imageUrl
      this.symbol = defaultSymbol
      this.date = moment().unix()
      this.duration = 3600
      this.maxTickets = 1000
    },
    close: function () {
      this.reset()
      this.dialog = false
    },
    save: async function () {
      await this.$store.dispatch('createEvent', [
        this.title,
        this.description,
        this.imageUrl,
        this.symbol,
        this.ticketCost,
        this.date,
        this.duration,
        this.maxTickets
      ])
      this.close()
    }
  }
}
</script>
