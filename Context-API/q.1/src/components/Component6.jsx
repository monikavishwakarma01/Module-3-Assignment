import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function Component6() {
    const {e} = useContext(AppContext);
  return (
    <div>
        
        <h4>this is prop e: {e}</h4>
        
    </div>
  )
}

export default Component6