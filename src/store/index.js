import Vue from 'vue'
import Vuex from 'vuex'
import auth from '@/store/modules/auth'
import Web3 from 'web3'

const web3 = new Web3(window.ethereum)
const ticketFactory = require('./../abis/TicketFactory.json')
const ticketOffice = require('./../abis/TicketOffice.json')
const ticketFactoryContract = new web3.eth.Contract(
  ticketFactory.abi,
  '0xdab2F7975415401340df6F6eDE457BD9122a6BD4'
)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    eventList: [],
    transaction: false,
    transactionText: '',
    transactionUrl: ''
  },
  getters: {
    allEvents: state => state.eventList,
    transaction: state => state.transaction,
    transactionText: state => state.transactionText,
    transactionUrl: state => state.transactionUrl
  },
  mutations: {
    setEvents: (state, payload) => {
      state.eventList.unshift(payload)
    },
    setTransaction: (state, payload) => {
      state.transaction = payload
    },
    setTransactionText: (state, payload) => {
      state.transactionText = payload
    },
    setTransactionUrl: (state, payload) => {
      state.transactionUrl = payload
    }
  },
  actions: {
    getEvents: async ({ commit }) => {
      const eventsCount = await ticketFactoryContract.methods.countEvents().call()
      for (let i = 0; i < eventsCount; i++) {
        commit('setEvents', await ticketFactoryContract.methods.eventsList(i).call())
      }
    },
    buyTicket: async ({ getters, commit }, payload) => {
      const ticketOfficeContract = new web3.eth.Contract(
        ticketOffice.abi,
        payload.address
      )
      ticketOfficeContract.methods.mint()
        .send({
          from: getters['auth/address'],
          value: payload.value
        })
        .on('transactionHash', function (hash) {
          commit('setTransactionText', 'Watch your transaction on Etherscan.io')
          commit('setTransactionUrl', 'https://ropsten.etherscan.io/tx/' + hash)
          commit('setTransaction', true)
        })
    },
    createEvent: async ({ dispatch, getters }, payload) => {
      ticketFactoryContract.methods.addEvent(...payload).send({
        from: getters['auth/address']
      })
    },
    getTotalSupply: async (context, address) => {
      const ticketOfficeContract = new web3.eth.Contract(
        ticketOffice.abi, address
      )
      return await ticketOfficeContract.methods.totalSupply().call()
    },
    getMyTickets: async ({ getters }, address) => {
      const ticketOfficeContract = new web3.eth.Contract(
        ticketOffice.abi, address
      )
      return await ticketOfficeContract.methods.balanceOf(getters['auth/address']).call()
    }
  },
  modules: {
    auth
  }
})
