import React, { Component } from 'react'
import styled from "styled-components";
import { ContextConsumer } from '../../context';
import {Markup} from "interweave";
import {gql} from "@apollo/client";
import { client } from '../../../App';


const Container=styled.div`
  display:flex;
  justify-content:space-around;
  margin-top:40px;
  z-index:-1;
`

const ImageCollection=styled.div`
flex:1;
display:flex;
flex-direction:column;

`

const Image=styled.img`
width:150px;
height:80px;
cursor:pointer;
object-fit:cover;
margin:20px auto;


`

const MainImageContainer=styled.div`
display:flex;
justify-content:center;
align-items:start;
flex:1;
`
const MainImage=styled.img`
  width:400px;
`
const Info=styled.div`
flex:1;
display:flex;
justify-content:center;


`

const InfoWrapper=styled.div`

`
const Title=styled.h1`
font-size:30px;
`

const AttributeContainer=styled.div`

    margin:40px 0;
    

  

   .attributes {
     list-style:none;
     display:flex;
     gap:15px;
   }
   .attributes li {
     position:relative;
     height:45px;
     width:45px;
     padding:3px;
     border:1px solid black;
     cursor:pointer;
   }

   input[type="radio"],label {
     position:absolute;
     width:100%;
     height:100%;
     top:0;
     bottom:0;
     left:0;
     right:0;
   }

   input[type="radio"] {
     opacity:0.01;
     z-index:100;
   }

   

   .attributes label {
     display:flex;
     justify-content:center;
     align-items:center;
   }


   .box-input:checked+label {
     background:black;
     color:#fff;
   }

   .color-input:checked+label {
     border:1px solid #5ECE7B;
   }

  
  

    
`


const Price=styled.div``

const Button=styled.button`
background: #5ECE7B;
width:300px;
height:50px;
border:none;
color:#fff;
text-transform:uppercase;
font-size:16px;
font-weight:600;
cursor:pointer;


`
const Description=styled.div`
margin-top:20px;
font-family: 'Roboto', sans-serif;
`

export default class ProductDetails extends Component {
  state={
    productData:{},
    currentImage:""
   
  }
  componentDidMount() {
    this.getData();


  }
  
  selectMainImage=(source)=>{
      this.setState(()=>{
        return {
          currentImage:source
        }
      })
  }

  async getData() {

    this.GET_PRODUCT=gql`
        query getProduct($id:String!) {
            product(id:$id) {
                name
                id
                inStock
                brand
                gallery
                description
                prices {
                amount
                currency {
                label
                symbol
                
                }
                }
                

                attributes {
                  name
                  type
                  items {
                    displayValue
                    value
                    id
                  }
                }
            
            }
        
        }
    
    `

    const WatchQuery3=client.watchQuery({
      query:this.GET_PRODUCT,
      variables:{
        id:new URLSearchParams(window.location.search).get("search")
      }
    })

    this.obj=WatchQuery3.subscribe(({data})=>{
          this.setState(()=>{
            return {
              productData:data
            }
          })
    })
  }
   
   

 
  render() {

   
    return (
      <ContextConsumer>
          {
              value=>{

                   const {id,gallery,inStock,name,prices,description,attributes}={...this.state.productData?.product};
                   const ProductDescription=description;
                 
                   return <Container>
                      <ImageCollection>
                       {
                         gallery?.map((image)=>(
                           <Image key={image} onClick={()=>this.selectMainImage(image)}  src={image}/>
                         ))
                       }
                       
                     </ImageCollection>  
                     
                     <MainImageContainer>
                       <MainImage src={this.state.currentImage?this.state.currentImage:gallery?.[0]} alt="main-image"/>
                     </MainImageContainer>
                     <Info>
                       <InfoWrapper>
                        <Title>{name}</Title>
                        <span id="errorCase">{value.errorMessage}</span>
                        {attributes?.map(attribute=>(
                          <AttributeContainer key={attribute.name}>
                      <h2 className="attributeName">{attribute.name}:</h2>
                      <ul className="attributes">
                        {attribute?.items?.map(item=>(
                          attribute.name!=="Color"?
                          <li key={item.id}>
                            <input defaultChecked={item.value===value.cartContent[value.cartContent.indexOf(value.cartContent.find(x=>x.id===id))]?.selected[value.cartContent.find(x=>x.id===id)?.selected.indexOf(value.cartContent.find(x=>x.id===id)?.selected.find(x=>x.name===attribute.name))].optionSelected?true:false} onClick={()=>value.getProductAttributes(id,attribute.name,item.value)}  className="box-input" type="radio" value={item.value} name={id+attribute.name}/>
                            <label htmlFor={item.value}>{item.value}</label>
                          </li>:
                          <li key={item.id} style={{background:item.value}}>
                            <input defaultChecked={item.value===value.cartContent[value.cartContent.indexOf(value.cartContent.find(x=>x.id===id))]?.selected[value.cartContent.find(x=>x.id===id)?.selected.indexOf(value.cartContent.find(x=>x.id===id)?.selected.find(x=>x.name===attribute.name))].optionSelected?true:false} className="color-input"  onClick={()=>value.getProductAttributes(id,attribute.name,item.value)}   type="radio" value={item.value} name={id+name}/>
                            <label htmlFor={item.value}></label>
                          </li>
                        ))}
                      </ul>
                     
                    
                  </AttributeContainer>
                        ))}
                          <Price>
                            <h2 className="attributeName">Price</h2>
                            <h2 className="price">{value.currentSymbol} {prices?.[prices?.indexOf(prices?.find(x=>x.currency.symbol===value.currentSymbol))].amount} </h2>
                          </Price>
                          <Button onClick={()=>value.checkAttributes(id)} disabled={value.checkCart(id)?true:false}>{value.checkCart(id)?"In Cart":"Add To Cart"}</Button>
                          <Description>
                            <Markup content={ProductDescription}/>
                          </Description>
                        </InfoWrapper>
                     </Info>
                   </Container>
              }
          }
          
      </ContextConsumer>
    )
  }
}
