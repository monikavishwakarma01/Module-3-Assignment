import React, { useContext } from 'react'
import Component5 from './Component5';
import  { AppContext } from '../context/AppContext';

function Component4() {
    const {c, d} = useContext(AppContext)
  return (
    <div>
         <h4>this is a from component2 : {c}</h4>
         <h4>this is b from component2 : {d}</h4>

         <Component5/>
    </div>
  )
}

export default Component4
