import React, { Component } from 'react'
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { ContextConsumer } from '../../context';


const Container=styled.div`
        margin:20px 10px;
        cursor:pointer;
        position:relative;
        padding:10px;
        transition:all 1s ease;
        overflow:hidden;

        



        &:hover {
            transform:scale(1.1);
            box-shadow:0 0 10px 7px rgba(0,0,0,0.1);

            .shop {
                transform:translate(0%,50%);
                display:block;
                
            }
        }
        
       
       
`


const Name=styled.h2`
    font-size:18px;
    font-weight:300;
    
`
const Image=styled.img`
width:360px;
height:400px;
object-fit:cover;



`
const ImageWrapper=styled.div`
position:relative;

`
const Price=styled.div`
font-weight:600;
font-size:18px;

`
const OutOfStock=styled.div`
position:absolute;
top:0;
left:0;
right:0;
bottom:0;
display:flex;
justify-content:center;
align-items:center;
font-size:24px;
color: #8D8F9A;




`
const BlurEffect=styled.div`
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background:rgba(255,255,255,0.5);
`

const Shop=styled.button`
position:absolute;
bottom:0;
right:0;
display:none;
background:transparent;
border:none;
cursor:pointer;

.inCart {
  padding:20px;
  background:#5ECE7B;
  color:#fff;
  border-radius:50%;
}

`


export default class Product extends Component {
 
  
  render() {
      const {id,gallery,inStock,name,prices,brand,attributes}=this.props.product;
      
      
      
    return (
      <ContextConsumer>
        {
          value=>(
              <Container  >
        
         
          <ImageWrapper>
          <Link  to={`details?search=${id}`}>
          <Image   src={gallery[0]} alt={name}/>
          {!inStock? <OutOfStock >OUT OF STOCK</OutOfStock>:null}
          
          </Link>
           <Shop  onClick={attributes.length!==0?()=>value.openModal(id):()=>{value.addInCart(id);value.increment(id)}}  className="shop">:<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="26" cy="26" r="26" fill="#5ECE7B"/>
<path d="M37.4736 19.8484C37.0186 19.2925 36.3109 18.9546 35.5785 18.9546H20.1907L19.711 17.1669C19.4326 16.1277 18.4732 15.4028 17.3608 15.4028H14.7837C14.3544 15.4028 14 15.7407 14 16.1523C14 16.5628 14.3534 16.9017 14.7837 16.9017H17.3608C17.7398 16.9017 18.0685 17.1433 18.1692 17.5058L21.2517 29.2494C21.53 30.2886 22.4894 31.0135 23.6018 31.0135H33.6833C34.7947 31.0135 35.7808 30.2886 36.0335 29.2494L37.9286 21.807C38.1053 21.1293 37.9543 20.4044 37.4736 19.8485L37.4736 19.8484ZM36.3879 21.4671L34.4928 28.9095C34.3921 29.272 34.0634 29.5136 33.6844 29.5136H23.6018C23.2228 29.5136 22.8941 29.272 22.7935 28.9095L20.5953 20.4772H35.5796C35.8323 20.4772 36.085 20.598 36.237 20.7915C36.388 20.984 36.463 21.2257 36.388 21.4673L36.3879 21.4671Z" fill="white"/>
<path d="M24.1332 31.9778C22.6932 31.9778 21.5059 33.1132 21.5059 34.4902C21.5059 35.8672 22.6933 37.0027 24.1332 37.0027C25.5733 37.0036 26.7606 35.8682 26.7606 34.491C26.7606 33.1137 25.5732 31.9775 24.1332 31.9775V31.9778ZM24.1332 35.4814C23.5519 35.4814 23.0968 35.0463 23.0968 34.4903C23.0968 33.9344 23.5519 33.4993 24.1332 33.4993C24.7146 33.4993 25.1696 33.9344 25.1696 34.4903C25.1687 35.0227 24.689 35.4814 24.1332 35.4814Z" fill="white"/>
<path d="M32.8251 31.978C31.3851 31.978 30.1978 33.1135 30.1978 34.4905C30.1978 35.8675 31.3852 37.0029 32.8251 37.0029C34.2651 37.0029 35.4525 35.8675 35.4525 34.4905C35.4279 33.1143 34.2651 31.978 32.8251 31.978ZM32.8251 35.4816C32.2438 35.4816 31.7887 35.0465 31.7887 34.4906C31.7887 33.9346 32.2438 33.4995 32.8251 33.4995C33.4065 33.4995 33.8615 33.9346 33.8615 34.4906C33.8615 35.0229 33.3809 35.4816 32.8251 35.4816Z" fill="white"/>
</svg></Shop>
          </ImageWrapper>
          
          
            {!inStock? <BlurEffect ></BlurEffect>:null}
          <Name >{brand} {name}</Name>
          <Price> {value.currentSymbol} {prices[prices.indexOf(prices.find(x=>x.currency.symbol===value.currentSymbol))].amount}</Price>
        
          
          
        
      </Container>
          )
        }
        
      
      </ContextConsumer>
    )
  }
}
