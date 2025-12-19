import React from 'react'
import Component2 from "./Component2";
import { AppContext } from '../context/AppContext';

function Component1() {

    const values={
        a :"apple",
        b :"banana",
        c :"batman",
        d :"cat",
        e :"elephant",
        f :"fish"
    }

  return (
    <div>
        <AppContext.Provider value={ values} >
              <Component2/>
        </AppContext.Provider>
       0
    </div>
  )
}

export default Component1;
