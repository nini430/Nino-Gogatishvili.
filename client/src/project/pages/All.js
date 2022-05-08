import React, { Component } from 'react'
import { ContextConsumer } from '../context'
import {Outlet} from "react-router-dom"
import Product from './components/Product';
import { Container } from '../CategoryStyles';
import { CategoryName } from '../CategoryStyles';
import { Products } from '../CategoryStyles';


export default class All extends Component {
  render() {
    return (
      <ContextConsumer>
        {
          (value)=>(
            
           
            <Container>
              <CategoryName>
                 {value.all.name}
                 
              </CategoryName>

              <Products>
                {
                  value.all.products?.map(product=>(
                    <Product  key={product.id} product={product}/>
                  ))
                }
              </Products>
              <Outlet/>
            </Container>
             
          )
        }
      </ContextConsumer>
      
    )
  }
}
