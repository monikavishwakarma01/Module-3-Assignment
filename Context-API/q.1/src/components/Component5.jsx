import Component6 from './Component6';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Component5() {
    const {f} = useContext(AppContext);
  return (
    <div>
      
        <h4>this is prop f: {f}</h4>
       <Component6/>
    </div>
  )
}

export default Component5
