import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function Component6() {
    const {a, b, c, d, e, f} = useContext(AppContext);
  return (
    <div>
        <h4>this is a from component2 : {a}</h4>
        <h4>this is b from component2 : {b}</h4>
        <h4>this is a from component2 : {c}</h4>
        <h4>this is b from component2 : {d}</h4>
        <h4>this is a from component6 : {e}</h4>
        <h4>this is b from component6 : {f}</h4>
    </div>
  )
}

export default Component6