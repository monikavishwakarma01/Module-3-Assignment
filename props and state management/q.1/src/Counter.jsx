import React from 'react'
import { useState } from 'react';

function Counter() {
    const [count, setCount]=useState(0)
  return (
    <>
      <h3>{count}</h3>
      <button onClick={()=>setCount(count+1)}>Click</button>
    </>
  )
}

export default Counter