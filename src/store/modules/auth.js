import Web3 from 'web3'
import { abi } from './../../abis/TicketFactory.json'
const web3 = new Web3(window.ethereum)
const DEFAULT_ADDRESS = '0x0000000000000000000000000000000000000000'
const FACTORY = '0x734631387eac259b640bee280045849ad1cf0f0e'

const state = {
  authenticated: false,
  owner: false,
  address: DEFAULT_ADDRESS
}

const getters = {
  isOwner: state => state.owner,
  address: state => state.address,
  shortAddress: state => {
    return state.address.slice(0, 6) + '...' + state.address.slice(38, 42)
  },
  isAuthenticated: state => state.authenticated
}

const mutations = {
  setOwner: (state, isOwner) => {
    state.owner = isOwner
  },
  setAddress: (state, address) => {
    state.address = address
  },
  setAuthenticated: (state, value) => {
    state.authenticated = value
  }
}

const actions = {
  setAddress: async ({ state, commit, dispatch }) => {
    const ticketFactory = new web3.eth.Contract(abi, FACTORY)
    const user = await web3.eth.getAccounts()
    commit('setAddress', user[0])
    const owner = await ticketFactory.methods.owner().call()
    const isOwner = state.address.toLowerCase() === owner.toLowerCase()
    commit('setOwner', isOwner)
    dispatch('getEvents', null, { root: true })
  },
  connect: ({ commit, dispatch }) => {
    if (Object.prototype.hasOwnProperty.call(window, 'ethereum')) {
      window.ethereum.enable()
      commit('setAuthenticated', true)
      dispatch('setAddress')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
