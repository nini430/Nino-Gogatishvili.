import React, { Component } from 'react'
import { ContextConsumer } from '../../context'
import styled from 'styled-components';

const Container=styled.div`
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
background:rgba(57, 55, 72, 0.22);
z-index:200;
display:flex;
justify-content:center;
align-items:center;
`

const Wrapper=styled.div`
  width:30%;
  
  background:#fff;
  border-radius:0.1rem;
  padding:10px;
 

  p {
    text-align:center;
  }
  
`

const Image=styled.img`
  width:300px;
  height:200px;
  object-fit:cover;
  display:block;
  margin:auto;
`
const ModalContainer=styled.div`



.attributes {
  display:flex;
  gap:10px;
  margin:5px 0;
}

.attributes div {
  position:relative;
  width:50px;
 height:50px;
}
input[type="radio"],label {
  position:absolute;
  width:100%;
  height:100%;
  top:0;
  left:0;
  bottom:0;
  right:0;
  border:1px solid black;

}

.box-input:checked+label {
  background:black;
  color:white;
}

.color-input:checked+label {
  border:1px solid #5ECE7B;
}

.attributes input[type="radio"] {
  z-index:200;
  opacity:0.01;
}

label {
  display:flex;
  justify-content:center;
  align-items:center;
}

.checkAndAdd {
  padding:10px;
  background:#5ECE7B;
  color:#fff;
  border:none;
  display:block;
  margin:10px auto;
  cursor:pointer;
  
}


`

const Button=styled.button`
display:${props=>props.inCart==true?"block":"none"};
border:none;
color:#fff;
background:#5ECE7B;
`


const Name=styled.p``
const Price=styled.h3``

export default class AttributeModal extends Component {
  render() {
    return (
      <ContextConsumer>
        {
          value=>{
            const {id,gallery,name,brand,prices,attributes}=value.modalProduct;
             return  value.showModal?
            
             <Container>
                    <Wrapper>
                      <ModalContainer>
                      <p>Choose the product's attribute(s):</p>
                      <span style={{color:"red"}} id="errorCase">{value.errorMessage}</span>
                      <Image src={gallery[0]}/>
                        <Name>{brand} {name}</Name>
                        <Price>Price: {value.currentSymbol} {prices[prices.indexOf(prices.find(x=>x.currency.symbol===value.currentSymbol))].amount}</Price>
                        {
                          attributes.map(attribute=>(
                            <div key={attribute.name}>
                            <span>{attribute.name}</span>
                            <div className="attributes">
                              {
                                attribute.items.map(item=>(
                                  attribute.name!=="Color"?
                                  <div key={item.id}>
                                    <input  className="box-input" onClick={()=>value.getProductAttributes(id,attribute.name,item.value)} defaultChecked={item.value===value.cartContent[value.cartContent.indexOf(value.cartContent.find(x=>x.id===id))]?.selected[value.cartContent.find(x=>x.id===id)?.selected.indexOf(value.cartContent.find(x=>x.id===id)?.selected.find(x=>x.name===attribute.name))]?.optionSelected?true:false} type="radio" name={id+attribute.name} />
                                    <label htmlFor={item.value}>{item.value}</label>
                                  </div>:
                                  <div key={item.id}>
                                  <input onClick={()=>value.getProductAttributes(id,attribute.name,item.value)} defaultChecked={item.value===value.cartContent[value.cartContent.indexOf(value.cartContent.find(x=>x.id===id))]?.selected[value.cartContent.find(x=>x.id===id)?.selected.indexOf(value.cartContent.find(x=>x.id===id)?.selected.find(x=>x.name===attribute.name))]?.optionSelected?true:false} className="color-input" type="radio" disabled={value.cartContent.find(x=>x.id===id)?true:false}/>
                                  <label style={{background:item.value}}></label>
                                </div>
                                

                                ))
                                
                              
                              }





                             
                            </div>
                            
                            </div>
                            
                          
                          ))
                          
                        
                        }
                        <Button onClick={()=>value.changeAttribute(id)} inCart={value.checkCart(id)?true:false}>Change selected Attributes</Button>
                        <button disabled={value.checkCart(id)?true:false} className="checkAndAdd" onClick={()=>{value.checkAttributes(id);}}>{value.checkCart(id)?"In Cart":"Add to Cart"}</button>
                      </ModalContainer>
                      
                    </Wrapper>
                  </Container>:null
          }
        }
      </ContextConsumer>
    )
  }
}





