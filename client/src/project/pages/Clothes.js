import React, { Component } from 'react'
import { ContextConsumer } from '../context'

import Product from './components/Product';
import { Container } from '../CategoryStyles';
import { CategoryName } from '../CategoryStyles';
import { Products } from '../CategoryStyles';
import { Outlet } from 'react-router-dom';


export default class Clothes extends Component {
  render() {
    return (
      <ContextConsumer>
        {
          value=>(
            <Container>
              <CategoryName>
              {value.clothes.name}
            </CategoryName>
              <Products>
                {value.clothes.products?.map(product=>(
                  <Product key={product.id} product={product} value={value}/>
                ))}
              </Products>
              
            </Container>
            
            

          
          )
        }
      </ContextConsumer>
    )
}

}
