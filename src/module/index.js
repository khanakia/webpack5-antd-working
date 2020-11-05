window.Sapp = {
  Store: {}
}

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from "react-router-dom";

import axios from 'axios';
window.axios = axios

import { globalStore } from './store'
Sapp.Store.globalStore= globalStore

import App from './App'
// import UxmMarket from '../packages/market'
// import UxmExchange from '../packages/exchange'

import Member from '../packages/member'

import MarketCss from '../assets/index'

import util from '../packages/core/util'
import hook from '../packages/core/hook'
import auth from '../packages/core/auth'
import route from '../packages/core/route'
// import menu from '../packages/core/menu'

const main = async () => {
  
  Sapp.Util = util
  Sapp.Hook = new hook()
  Sapp.Route = new route()

  Sapp.Auth = new auth()
  await Sapp.Auth.init()		

  Sapp['Member'] = new Member({})
  
  // Sapp['UxmExchange'] = new UxmExchange({})
	// await Sapp['UxmExchange'].init()

  axios.defaults.headers.common['Authorization'] = Sapp.Auth.getAuthorizationHeader()

  await Sapp.Hook.Action.do('beforeModuleInit')
  
  /*
    * I had to move BrowserRouter here because useHistory was not available in App.js which i need to the
    * GoogleAnalytics code so i wrapped the APP inside BrowserRouter so i can use useHistory hook in App.js
  */
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, 
    document.getElementById('root')
  );
}

main()
