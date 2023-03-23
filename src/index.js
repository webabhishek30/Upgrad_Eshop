import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Routes, Route} from "react-router-dom";
import Signin from './components/singin/signin';
import Header from './common/components/Appbar/Header';
import Signup from './components/signup/signup';
import Footer from './common/components/Footer/footer';
import Product from './components/products/products';
import AddProduct from './components/addProducts/addProducts';
import ProductDetails from './components/productDetail/productDetails';
import PlaceOrder from './components/placeOrder/placeOrder';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path='/signup' exact element={<Signup/>} />
      <Route path='/login' exact element={<Signin/>} />
      <Route path='/' exact element={<Product />} />    
      <Route path='/addProducts' exact element={<AddProduct/>} />   
      <Route path='/productDetails/:id'  element={<ProductDetails/>} />   
      <Route path='/placeOrder' exact element={<PlaceOrder/>} />   
    </Routes>
    <Footer/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
