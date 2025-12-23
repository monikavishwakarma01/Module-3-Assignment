import React, { useContext } from 'react'
import Component5 from './Component5';
import  { AppContext } from '../context/AppContext';

function Component4() {
    const {c, d} = useContext(AppContext)
  return (
    <div>
         <h4>this is prop c: {c}</h4>
         <h4>this is prop d: {d}</h4>

         <Component5/>
    </div>
  )
}

export default Component4
