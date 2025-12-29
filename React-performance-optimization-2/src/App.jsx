import React from 'react'
import { useState, Suspense } from 'react'
const Lazy =React.lazy(()=>import('./childComponent'))

function App() {

  console.log("parent render")
const [count, setCount]=useState(0)

  return (
    <div>
      <button onClick={(()=>setCount(count+1))}>Counter click: {count}</button>
        
        <br />
        <br />

     <Suspense fallback={<div>lodding...</div>}>
       <Lazy/>
     </Suspense>

    </div>

  )
}

export default App
