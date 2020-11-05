import React from 'react'
import { observable, action } from 'mobx';
import moment from "moment";

export const createMediaStore = observable({
    minDate: moment().format("YYYY-MM-DD"),
    filters: {
      // post_id: 109,
      // date_from: "2020-10-01"
    },
    items: [],
}, {}, {
  deep: false
})
const mediaStoreContext = React.createContext(createMediaStore)

export const useMediaStore = () => {
  const store = React.useContext(mediaStoreContext)
  return store
}
