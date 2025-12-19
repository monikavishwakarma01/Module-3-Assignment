import React from 'react'
import { useContext } from 'react';
import Component3 from "./Component3";
import  { AppContext } from '../context/AppContext';

function Component2() {
     const {a,b} = useContext(AppContext);
  return (
    <div>
        <h4>this is a from component2 : {a}</h4>
        <h4>this is b from component2 : {b}</h4>
       <Component3/>
    </div>
  )
}

export default Component2;