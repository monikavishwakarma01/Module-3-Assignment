import React from 'react'

function Calculator() {
  return (
    <div>
      <form>
          <input type="numbers" placeholder='Enter numbers'/>
          <input type="numbers" placeholder='Enter numbers'/>
         
          <br/><br />
          <select id="selectOperations">
            <option value="Add">Add</option>
            <option value="Subtract">Subtract</option>
            <option value="Multiply">Multiply</option>
          </select>
          <label htmlFor=""></label>
          <button>Click</button>
      </form>
    </div>
  )
}

export default Calculator
