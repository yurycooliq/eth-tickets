import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import Web3 from 'web3'

const web3 = new Web3(window.ethereum)
const ticketFactory = require('./../abis/TicketFactory.json')
const ticketOffice = require('./../abis/TicketOffice.json')
const ticketFactoryContract = new web3.eth.Contract(
  ticketFactory.abi,
  '0x734631387eac259b640bee280045849ad1cf0f0e'
)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventList: []
  },
  getters: {
    allEvents: state => state.eventList,
    isMetamaskExists: state => state.isMetamaskExists
  },
  mutations: {
    setEvents: (state, payload) => {
      state.eventList.unshift(payload)
    }
  },
  actions: {
    getEvents: async ({ commit }) => {
      const eventsCount = await ticketFactoryContract.methods.countEvents().call()
      for (let i = 0; i < eventsCount; i++) {
        commit('setEvents', await ticketFactoryContract.methods.eventsList(i).call())
      }
    },
    buyTicket: async ({ getters }, payload) => {
      const ticketOfficeContract = new web3.eth.Contract(
        ticketOffice.abi,
        payload.address
      )
      await ticketOfficeContract.methods.mint().send({
        from: getters['auth/address'],
        value: payload.value
      })
    },
    createEvent: async ({ dispatch, getters }, payload) => {
      ticketFactoryContract.methods.addEvent(...payload).send({
        from: getters['auth/address']
      })
    }
  },
  modules: {
    auth
  }
})
