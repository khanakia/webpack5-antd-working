import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";
import * as mobx from 'mobx';

// import { inject, observer } from 'mobx-react';
import _ from 'lodash'
// import ReactGA from 'react-ga';

import LayoutDefault from './components/Common/LayoutDefault'
import LayoutPrint from './components/Common/LayoutPrint'
// import LayoutJoinProsper from './components/Common/LayoutJoinProsper'
import LayoutPrivate from './components/Layouts/LayoutPrivate'
import LayoutPublic from './components/Layouts/LayoutPublic'
import NoMatch from './components/Common/NoMatch'

const Layouts = {
  LayoutDefault,
  LayoutPrint,
  // LayoutJoinProsper,
  LayoutPrivate,
  LayoutPublic
}

// window.mobx = mobx

function LayoutRenderer(props) {
  const { layoutComponentName, layoutProps={}, ChildComponent, childProps={} } = props
  const LayoutComponent = Layouts[layoutComponentName] || LayoutDefault

  return (
    <LayoutComponent {...layoutProps}>
      <ChildComponent {...childProps} />
    </LayoutComponent>
  )
}

const App = () => {
  const history = useHistory()

  let routes = Sapp.Store.globalStore.routes
  routes = _.sortBy(routes, ['priority']);

  // useEffect(() => {
  //    // Init Google Analytics Tracking
  //   if(APP_CONFIG.gaTrackingCode) {
  //     console.log('GA Tracking Started')
  //     ReactGA.initialize(APP_CONFIG.gaTrackingCode);
  //     ReactGA.pageview(window.location.href);
  //     history.listen((location, action) => {
  //         ReactGA.pageview(window.location.href);
  //     });
  //   }
  // }, [])

  return (
      <Switch>
          {routes.map((route,i) => {
              const {path, exact} = route
              return (
                  <Route key={location.pathname} path={path} exact={exact} render={(props) => {
                    // console.log(props)
                    const routeObj = (mobx.toJS(route))
                    // console.log(routeObj)
                    const { layout, layoutProps, component } = routeObj
                    return <LayoutRenderer 
                        layoutComponentName={layout} 
                        layoutProps={layoutProps} 
                        ChildComponent={component}
                      />
                  } } />
              )
          })}
          <Route render={(props) => <NoMatch {...props} /> } />
      </Switch>
  )
}

export default App