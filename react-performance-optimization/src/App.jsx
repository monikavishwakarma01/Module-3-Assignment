import React from 'react'
import ProductList from './ProductList'
import { useState, useMemo, useCallback} from 'react'


function App() {
   const [counter, setCounter]=useState(0)

  console.log("parent rerendr")

   const products=[
    { id: 1, name: "Laptop", price: 70000 },
    { id: 2, name: "Phone", price: 29000 },
    { id: 3, name: "Tablet", price: 89000 },
   ]

  const totlePrize= useMemo(()=>{
       return products.reduce((sum,item)=> sum+item.price,0)
  },[products])


  const handleSelectProduct=useCallback((product)=>{
      console.log("product name", product.name)
  },[])


  return (
    <>
      <h2>{totlePrize}</h2>
      <button onClick={(()=>setCounter(counter+1))} >Counter: {counter}</button> 
      <ProductList
        products={products}
        onSelect={handleSelectProduct}
      />
    </>
  )
}

export default App