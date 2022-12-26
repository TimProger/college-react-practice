import React from 'react';
import './App.scss';
import {useTypedSelector} from "./hooks/useTypedSelector";

function App() {

  const {products} = useTypedSelector(state => state.product)

  return (
    <div className="app">
      {products && products.length > 0 && products.map(el=><p>{el.name}</p>)}
    </div>
  );
}

export default App;
