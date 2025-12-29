import React from 'react'

function ProductList({ products, onSelect }) {
  console.log("product rerender")
  return (
    <div>
        <ul>
            { products.map((product)=>
            <li key={product.id} >
                {product.name} - {product.price}
                <button onClick={()=>onSelect(product)}>Select</button>
            </li>
            )}
        </ul>
    </div>
  )
}

export default ProductList
