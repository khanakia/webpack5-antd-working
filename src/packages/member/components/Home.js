import React, { useEffect, useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";

import { observer } from 'mobx-react'
import { Button, DatePicker } from 'antd';


const Home = observer(() => {
  const inputSearchEl = useRef()
  const categorySelectEl = useRef()
  
  // const { globalStore } = useStores()

  const history = useHistory()
  

  return (
    <div className="HomeComp">
     
    HOME
    
     
     
    </div>
  );
})

export default Home;