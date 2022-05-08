import React, { Component } from 'react'
import styled from 'styled-components';
import { ContextConsumer } from '../context';


const Container=styled.div`
border-bottom:1px solid  #E5E5E5;

display:flex;
justify-content:space-between;
align-items:center;
margin:20px 0;
padding-bottom:20px;

`
const LeftSide=styled.div`

.productName {
    font-weight:300;
}

.brand {
    font-weigh:600;
    fonts-size:21px;
}

.boxes {
    display:flex;
    gap:5px;
    margin:10px 0;
}

.boxes div {
    position:relative;
    width:40px
    height:40px;
    padding:15px;
    border:1px solid black;
}

.box-input:checked+label {
    background:black;
    color:white;
}

.color-input:checked+label {
    border:1px solid #5ECE7B;
}

input[type="radio"]+label {
    width:100%;
    height:100%;
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
}

input[type="radio"] {
    z-index:200;
    opacity:0.01;
}

label {
    display:flex;
    justify-content:center;
    align-items:center;
}



`
const RightSide=styled.div`
 display:flex;
 gap:5px;
    
`

const ChangeQuantity=styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-between;
    .plusMinus {
        padding:10px 15px;
        border:1px solid black;
        font-size:22px;
        cursor:pointer;
    }
`
const ImageContainer=styled.div`
width:200px;
height:300px;
position:relative;
overflow:hidden;


`

const Arrow=styled.div`
    background:rgba(0,0,0,0.73);
    width:25px;
    height:25px;
    position:absolute;
    bottom:5%;
    right:${props=>props.right && "10px"};
    right:${props=>props.left && "40px"};
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    
   
  
`



const Image=styled.img`
        width:200px;
        height:300px;
        object-fit:cover;
`;


const Wrapper=styled.div`
    transform:translateY(${props=>props.slideIndex*-100}%)
    
`


export default class ProductInCart extends Component {
    
    state={
        slideIndex:0
    }
   

    changeSlide=(direction,galleryLength)=>{
        if(direction==="left") {
            this.setState(()=>{
                return {
                    slideIndex:this.state.slideIndex>0?this.state.slideIndex-1:galleryLength-1
                }
            })
        }else{
            this.setState(()=>{
                return {
                    slideIndex:this.state.slideIndex<galleryLength-1?this.state.slideIndex+1:0
                }
            })
        }
    }
   
  render() {
    const {id,name,prices,attributes,brand,gallery}=this.props.item;
    return (
        <ContextConsumer>
            {
                value=>(
                    <Container>
                   
                    <LeftSide>
                        <h2 className="brand">{brand}</h2>
                        <h2 className="productName">{name}</h2>
                        <h3>{value.currentSymbol} {parseFloat(prices[prices.indexOf(prices.find(x=>x.currency.symbol===value.currentSymbol))].amount).toFixed(2)}</h3>
                        {
                            attributes.map(attribute=>(
                                <div key={attribute.name} className="boxes">
                                    {attribute.items.map(item=>(
                                      attribute.name==="Color"?
                                      <div key={item.id}>
                                          <input defaultChecked={item.value===value.cartContent[value.cartContent.indexOf(value.cartContent.find(x=>x.id===id))]?.selected[value.cartContent.find(x=>x.id===id)?.selected.indexOf(value.cartContent.find(x=>x.id===id)?.selected.find(x=>x.name===attribute.name))].optionSelected?true:false}  className="color-input" type="radio" disabled/>
                                          <label style={{background:item.value}} htmlFor={item.id}></label>
                                      </div>: 
                                      <div key={item.id}>
                                          <input defaultChecked={item.value===value.cartContent[value.cartContent.indexOf(value.cartContent.find(x=>x.id===id))]?.selected[value.cartContent.find(x=>x.id===id)?.selected.indexOf(value.cartContent.find(x=>x.id===id)?.selected.find(x=>x.name===attribute.name))].optionSelected?true:false}  className="box-input" type="radio" disabled/>
                                          <label htmlFor={item.id}>{item.value}</label>
                                      </div>
                                    ))}
                                </div>
                            ))
                        }
                    </LeftSide>
                    <RightSide>
                        <ChangeQuantity>
                            <span onClick={()=>value.increment(id)} className="plusMinus">+</span>
                            <span>{value.cartQuantityData[value.cartQuantityData.indexOf(value.cartQuantityData.find(x=>x.name===id))].quantity}</span>
                            <span onClick={()=>value.decrement(id)} className="plusMinus">-</span>
                        </ChangeQuantity>
                       <ImageContainer>
                       {gallery.map(pic=>(
                           <Wrapper key={pic} slideIndex={this.state.slideIndex}>
                           <Image src={pic}/>
                           </Wrapper>
                           
                       ))}
                        <Arrow left onClick={()=>this.changeSlide("left",gallery.length)}>
                        
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.25 1.06857L1.625 6.6876L7.25 12.3066" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        </Arrow>
                        <Arrow right onClick={()=>this.changeSlide("right",gallery.length)}>
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 1.06808L6.375 6.68711L0.75 12.3062" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                        </Arrow>
                       </ImageContainer>
                    </RightSide>
                    
                </Container>
                )
            }
        </ContextConsumer>
      
    )
  }
}
