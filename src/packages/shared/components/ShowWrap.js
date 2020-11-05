import React, { Fragment } from 'react';

function ShowWrap(props) {
  const { show } = props
  
  if(!show) return null

  return (
    <Fragment>
      {props.children}
    </Fragment>
  );
}

export default ShowWrap