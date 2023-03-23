import './App.css';
import Signin from './common/components/singin/signin';
import Signup from './common/components/signup/signup';
import Products from './components/products/products';
import ProductDetails from './components/productDetail/productDetails';
import PlaceOrder from './components/placeOrder/placeOrder';
import { useState } from 'react';



function App() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="App h-100">
      <Signin/>
      <Signup/>
      <Products/>
      <ProductDetails setQuantity = {setQuantity}/>
      <PlaceOrder quantity = {quantity}/>
    </div>
    
  );
}

export default App;
