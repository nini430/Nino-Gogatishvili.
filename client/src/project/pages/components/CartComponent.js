
import React, { Component } from 'react'
import styled from 'styled-components';
import { ContextConsumer } from '../../context';



const Container=styled.div`
z-index:10;
display:flex;
gap:10px;
align-items:center;
margin:15px 0;
`
const Info=styled.div`
flex:1;
    .title {
        font-weight:300;
        font-size:16px;
    }
    .price {
        font-size:16px;
        font-weight:700;

    }
    .attributes {
      list-style:none;
      display:flex;
      gap:10px;
      
    }

    .color {
     
      width:10px;
      height:10px;
      padding:3px;
      position:relative;
      

    }

    .box {
      min-width:40px;
      min-height:40px;
      position:relative;
      border:1px solid black;
    }

    label {
      display:flex;
      justify-content:center;
      align-items:center;
      cursor:pointer;
    }
    

    input[type="radio"],label {
      position:absolute;
      width:100%;
      height:100%;
      top:0;
      left:0;
      bottom:0;
      right:0;
    }

    input[type="radio"] {
      opacity:0.01;
      z-index:100;
    }
    .box-input:checked+ label {
      background:#000;
      color:#fff;

    }

    .color-input:checked+label {
      border: 1px solid #5ECE7B;
    }

   
`
const ImageContainer=styled.div`
    display:flex;
    gap:20px;
    flex:1;
`
const Image=styled.img`
    width:120px;
    height:150px;
    object-fit:cover;
`

const ChangeQuantity=styled.div`
display:flex;
flex-direction:column;
justify-content:space-between;
align-items:center;
    .plusMinus {

      font-size:23px;
      border:1px solid black;
      padding:2px 10px;
      cursor:pointer;
    }
`

const Wrapper=styled.div``;
export default class CartComponent extends Component {
  
  
  
  render() {
      const {id,gallery,prices,name,attributes,brand}=this.props.product;
    return (
        <ContextConsumer>
            {
                (value)=>(
                
                <Container>
                <Info>
                  <div className="names">
                    <h2 className="title">{brand}</h2>
                  <h2 className="title">{name}</h2>
                  </div>
                 
                 <span className="price">{value.currentSymbol}   {parseFloat(prices[prices.indexOf(prices.find(x=>x.currency.symbol===value.currentSymbol))].amount).toFixed(2)}</span>
                 {attributes.map((attribute)=>(
                   <div key={attribute.name}>
                     <p>{attribute.name}</p>
                     <div className="attributes">
                      {
                        attribute.items?.map((item)=>(
                          attribute.name!=="Color"?
                           <div key={item.id} className="box"><input className="box-input" defaultChecked={item.value===value.cartContent[value.cartContent.indexOf(value.cartContent.find(x=>x.id===id))]?.selected[value.cartContent.find(x=>x.id===id)?.selected.indexOf(value.cartContent.find(x=>x.id===id)?.selected.find(x=>x.name===attribute.name))]?.optionSelected?true:false}  type="radio" name={id+attribute.name} disabled/>
                            <label  htmlFor={item.value}>{item.value}</label>
                           </div>:
                            <div key={item.id} className="color" style={{background:item.value}}>
                              <input defaultChecked={item.value===value.cartContent[value.cartContent.indexOf(value.cartContent.find(x=>x.id===id))]?.selected[value.cartContent.find(x=>x.id===id)?.selected.indexOf(value.cartContent.find(x=>x.id===id)?.selected.find(x=>x.name===attribute.name))].optionSelected?true:false} className="color-input"    type="radio" name={id+attribute.name} disabled/>
                            <label htmlFor={item.value}></label>
                            </div>
                        ))
                      }
                      </div>
                      </div>
                     
                  
                 ))}
                </Info>

                <ImageContainer>
                  <ChangeQuantity>
                  <span onClick={()=>value.increment(id)}  className="plusMinus">+</span>
                  <span>{value.cartQuantityData[value.cartQuantityData.indexOf(value.cartQuantityData.find(x=>x.name===id))]?.quantity}</span>
                  <span onClick={()=>value.decrement(id)} className="plusMinus">-</span>
                  </ChangeQuantity>
                        <Wrapper>
                      <Image src={gallery[0]}/>
                      </Wrapper>
                </ImageContainer>
                </Container>
                
    )
            }
     
      </ContextConsumer>
    )
  }
}
