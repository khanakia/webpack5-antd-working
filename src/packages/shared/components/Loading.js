import React, { useState, useImperativeHandle, forwardRef } from 'react';

function Loading(props, ref) {
  const { overlay, show } = props
  const [visible, setVisible] = useState(show||false)

  useImperativeHandle(ref, () => ({
    show: () => {
      setVisible(true)
    },
    hide: () => {
      setVisible(false)
    }
  }));
  
  if(!visible) return null

  return (
    <div className="LoadingComp">
      {overlay ? <div className="overlay"></div> : null}
      <div className="spinnerWrapper">
        <div className="spinner-border text-primary-light" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}

Loading = forwardRef(Loading);

export default Loading