import Component6 from './Component6';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function Component5() {
    const {e, f} = useContext(AppContext);
  return (
    <div>
        <h4>this is a from component5 : {e}</h4>
        <h4>this is b from component5 : {f}</h4>
       <Component6/>
    </div>
  )
}

export default Component5
