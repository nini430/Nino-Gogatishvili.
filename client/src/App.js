import React, { Component } from 'react'
import NavBar from './project/NavBar';
import {Routes,Route} from "react-router-dom"
import All from './project/pages/All';
import Clothes from './project/pages/Clothes';
import Tech from './project/pages/Tech';
import {ApolloProvider,InMemoryCache,ApolloClient, gql} from "@apollo/client";
import ContextProvider from './project/context';
import "./App.css";
import ProductDetails from './project/pages/components/ProductDetails';
import CurrencyNav from './project/pages/components/CurrencyNav';
import CartOverlay from './project/pages/components/CartOverlay';
import Cart from './project/pages/Cart';
import AttributeModal from './project/pages/components/AttributeModal';


export const client=new ApolloClient({cache:new InMemoryCache(),
uri:"http://localhost:4000/gql"
})

class App extends Component {
    
 
  render() {
   

    return (
      
      <>
      <ContextProvider>
      <ApolloProvider client={client}>
      <AttributeModal/>
      <NavBar/>
      <CurrencyNav/>
      <CartOverlay />
      <Routes>
        <Route index element={<All/>}/>
        
        
        <Route path="details" element={<ProductDetails  />}/>
        <Route path="clothes" element={<Clothes/>}/>
        <Route path="clothes/details" element={<ProductDetails/>}/>
        <Route path="tech" element={<Tech/>}/>
        <Route path="tech/details" element={<ProductDetails/>}/>
        <Route path="cart" element={<Cart />}/>
      
       
       

        
        
      </Routes>
      
      
     
      </ApolloProvider>
      </ContextProvider>
      
      </>
    
      
    )
  }
}

export default App;