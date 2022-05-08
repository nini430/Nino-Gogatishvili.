import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ContextConsumer } from '../../context';
import CartComponent from './CartComponent';

const Container=styled.div`
    
    position:absolute;
    top:90px;
    bottom:0;
    right:0;
    left:0;
    background: rgba(57, 55, 72, 0.22);
    z-index:9;
`;

const Overlay=styled.div`
    padding:10px;
    width:350px;
    background:#fff;
    position:absolute;
    right:0;

    .bag {
        font-size:16px;
    }
`;
const TotalPrice=styled.div`
display:flex;
justify-content:space-between;
font-weight:600;

`
const Buttons=styled.div`
    margin-top:30px;
    display:flex;
    justify-content:space-around;

    .bag,.checkout {
        border:none;
        padding:10px 35px;
        font-size:16px;
        cursor:pointer;
        text-transform:uppercase;
        font-weight:500;
    }

    .bag {
        background:#fff;
        color:#000;
        border:1px solid #000;
    }

    .checkout {
        background:#5ECE7B;
        color:#fff;
    }


`

export default class CartOverlay extends Component {
    
    
   

  render() {
    
    return (
        <ContextConsumer>
            {
                value=>(
                    value.showCartOverlay?
                    <Container>
                        <Overlay>
                    <span  className="bag"><b>My Bag</b>, {value.totalQuantity} items</span>
                    {value.cartContent?.map(product=>(
                        <CartComponent key={product.id} product={product}/>
                    ))}
                    <TotalPrice>
                        <span>Total:</span>
                        <span>{value.currentSymbol} {parseFloat(value.total).toFixed(2)}</span>
                    </TotalPrice>
                    <Buttons>
                        <Link to="cart">
                        <button onClick={()=>value.showHideCartOverlay()} className="bag">view bag</button>
                        </Link>
                        
                        <button className="checkout">check out</button>
                    </Buttons>
                    </Overlay>
          
                </Container>:null
                )
            }
            
        </ContextConsumer>
      
    )
  }
}
