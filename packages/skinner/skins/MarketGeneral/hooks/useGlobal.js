import React from 'react'
import { useGlobalState } from '@xircus-web3/react'

const initialState = {
  app: false,
  item: {}, // 
  listing: {},  // currently selected listing
  listings: [], // items for listing
  currencies: [], // currencies
  assets: [], // collection assets
  chainNames: [], // chain short names
  chains: [], // chains full info
  users: [], // accounts
}

const actions = {
  setApp: (store, app) => app && store.setState({ app }),
  setUser: (store, user) => user && store.setState({ user }),
  setUsers: (store, users) => users && store.setState({ users }),
  setItem: (store, item) => item && store.setState({ item }),
  setChains: (store, chains) => chains && store.setState({ chains }),  
  setCurrencies: (store, currencies) => currencies && store.setState({ currencies }),
  setListing: (store, listing) => listing && store.setState({ listing }),
  setListings: (store, listings) => listings && store.setState({ listings })
}

const useGlobal = useGlobalState(React, initialState, actions)

export default useGlobal



