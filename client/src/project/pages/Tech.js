
import React, { Component } from 'react'
import { Container } from '../CategoryStyles';
import { CategoryName } from '../CategoryStyles';
import { Products } from '../CategoryStyles';
import { ContextConsumer } from '../context';
import Product from './components/Product';



export default class Tech extends Component {
  render() {
    return (
      <ContextConsumer>
          {
            value=>(
              <Container>
                <CategoryName>
                  {value.tech.name}

                </CategoryName>
                <Products>
                {
                  value.tech.products?.map(product=>(
                    <Product key={product.id} product={product} value={value}/>
                  ))
                }
                </Products>
                
              </Container>
            )
          }
      </ContextConsumer>
     
    )
  }
}
