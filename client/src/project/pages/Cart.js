import React, { Component } from 'react'
import styled from 'styled-components';
import { ContextConsumer } from '../context';
import ProductInCart from './ProductInCart';

const Container=styled.div`
    margin:40px 0;
    font-weight:700;
    

    .title {
      text-transform:uppercase;
      padding-bottom:50px 0;
      border-bottom:1px solid #E5E5E5;
      

    }
    .empty {
      text-align:center;
    }
` 

const Totals=styled.div`
display:flex;
flex-direction:column;
.tax,.quantity,.total {
  font-size:24px;
  margin:10px 0;
}

.order {
  width:300px;
  height:40px;
  background:#5ECE7B;
  color:#fff;
  text-transform:uppercase;
  border:none;
  cursor:pointer;
  margin:10px 0;
}
`
export default class Cart extends Component {
  render() {
    
    return (
      <Container>
        <div className="title">
        <h1 >Cart</h1>
        </div>
        
        <ContextConsumer>
          {
            value=> {
              if(value.totalQuantity===0) {
                  return <h1 className="empty">Your cart is currently empty</h1>
              }else{
                return <div> 
                 { value.cartContent?.map(item=>(
                  <ProductInCart key={item.name} item={item} />
                  
                ))}
                <Totals>
                  <span className="tax">Tax 21% : <strong>{value.currentSymbol} {parseFloat(value.total*0.21).toFixed(2)}</strong></span>
                  <span className="quantity"> Quantity: {value.totalQuantity}</span>
                  <span className="total">Total:{value.currentSymbol} {parseFloat(value.total).toFixed(2)}</span>
                  <button className="order">order</button>
                </Totals>
                </div>
                }
                
            }
            
              }
              
             
        </ContextConsumer>
      </Container>
    )
  }
}


