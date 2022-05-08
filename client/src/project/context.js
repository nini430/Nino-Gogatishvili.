import React, { Component } from 'react'
import { client } from '../App';
import { gql } from '@apollo/client';
const Context=React.createContext();


export default class ContextProvider extends Component {
    
        
        state= {
            categories:[],
            all:{},
            clothes:{},
            tech:{},
            products:[],
            product:{},
      cartContent:[],
      cartQuantityData:[],
      totalQuantity:0,
            currency:[],
            currentSymbol:"$",
            currentLabel:"USD",
            showSwitcher:false,
            showCartOverlay:false,
            selectedAttributes:[],
            showCircleCart:false,
            totalPrices:[],
            total:0,
            showModal:false,
            modalProduct:{},
            inCart:false,
            errorMessage:"",
         
            
    
            
        }


    componentDidMount() {
        this.getData()
        this.getItems();
      }
      async getData() {
        this.GETPRODUCTS=gql`
          query getCategories {
                categories {
                name
                products {
                id
                name
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
                }
        `
    
    const WatchQuery=client.watchQuery({
      query:this.GETPRODUCTS,
      
    })
    this.obj=WatchQuery.subscribe(({data})=>{
      this.setState(()=>{
          return {products:data.categories[0].products}
      })
      
      
      
    })
      }

  
    
      async getItems(){
        this.GET_CATEGORIES=gql`
            query getCategories {
            categories {
            name
            products {
            id
            name
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
            },

           

           
        `
        this.GET_CURRENCY=gql`
        query getCurrencies {
            currencies {
            label
            symbol
            }
        }
     `
      
    const WatchQuery=client.watchQuery({
        query:this.GET_CATEGORIES,
        
    })
    this.obj=WatchQuery.subscribe(({data})=>{
        this.setState(()=>{
            return {
                categories:data.categories,
                all:data.categories[0],
                clothes:data.categories[1],
                tech:data.categories[2],
                productList:data.categories[0].products
            }
        }) 
        
        
    })
    const WatchQuery2=client.watchQuery({
        query:this.GET_CURRENCY,
        
    })
    this.obj=WatchQuery2.subscribe(({data})=>{
        this.setState(()=>{
            return {currency:data.currencies}
        })
        
        
        
    })

    
}




addInCart=id=>{
    const tempCart=[...this.state.cartContent];
    const product=this.state.products.find(x=>x.id===id);
    const inCart=tempCart.find(x=>x.id===id);
    if(inCart!==undefined) {
        return;
    }else{
        tempCart.push(product);
        this.setState(()=>{
            return {
                cartContent:tempCart,
                showModal:false,
                errorMessage:""
                
            }
        })
    }
    

}




increment=id=>{
    const tempQuantity=[...this.state.cartQuantityData];
    const exists=tempQuantity.find(x=>x.name===id);
    const index=tempQuantity.indexOf(exists);
    let totalQuantity=0;
    if(exists) {
        tempQuantity[index].quantity+=1;
        tempQuantity.forEach(item=>{
            totalQuantity+=item.quantity;
        })
        this.setState(()=>{
            return {
                cartQuantityData:tempQuantity,
                totalQuantity
            }
        },this.getTotal())
    }else{
        let obj={
            name:id,
            quantity:1,
          
            
        }
        tempQuantity.push(obj);
        tempQuantity.forEach(item=>{
            totalQuantity+=item.quantity;
        })
    
        this.setState(()=>{
            return {
                cartQuantityData:tempQuantity,
                totalQuantity
                
            }
        },()=>this.getTotal())
    }
}

decrement=id=>{
    const tempQuantity=[...this.state.cartQuantityData];
    const tempCart=[...this.state.cartContent];
    const tempPrices=[...this.state.totalPrices]
    const product=tempQuantity.find(x=>x.name==id);
    const index=tempQuantity.indexOf(product);
    let totalQuantity=0;
    if(product.quantity===1) {
        const result=tempQuantity.filter(item=>item.name!==id);
        const content=tempCart.filter(item=>item.id!==id);
        const price=tempPrices.filter(item=>item!==tempPrices[index])
        result.forEach(item=>(
            totalQuantity+=item.quantity
            
        ))
        this.setState(()=>{
            return {cartQuantityData:result,cartContent:content,totalQuantity,totalPrices:price}
        },this.getTotal())
    }else{
            tempQuantity[index].quantity-=1;
            tempQuantity.forEach(item=>(
                totalQuantity+=item.quantity
            ))
            this.setState(()=>{
                return {cartQuantityData:tempQuantity,totalQuantity}
            },()=>this.getTotal())
    }
}



showHideCurrency=()=>{
    if(this.state.showSwitcher===true) {
            this.setState(()=>{
                return {showSwitcher:false}
            })
    }else{
        this.setState(()=>{
            return {showSwitcher:true}
        })
    }
}

changeCurrency=(symb)=>{
        const currency=this.state.currency.find(x=>x.symbol===symb);
        console.log(currency)
        this.setState(()=>{
            return {
                currentSymbol:currency.symbol,
                currentLabel:currency.label,
                showSwitcher:false
            }
        },()=>this.getTotal())
}



    showHideCartOverlay=()=>{
        if(this.state.showCartOverlay===true) {
            this.setState(()=>{
                return {
                    showCartOverlay:false
                } 
                    
                
            })
        }else{
            this.setState(()=>{
                return {
                    showCartOverlay:true
                }
            })
        }
    }
   




getTotal=()=>{
    let total=[];
    this.state.cartQuantityData.forEach(item=>{
        total.push(item.quantity*this.state.cartContent.find(x=>x.id===item.name)?.prices[this.state.cartContent.find(x=>x.id===item.name).prices.indexOf(this.state.cartContent.find(x=>x.id===item.name).prices.find(x=>x.currency.symbol===this.state.currentSymbol))].amount);
    })
    this.setState(()=>{
        return {
            totalPrices:total
        }
    },()=> {this.getTotalOfAll();})
}


getTotalOfAll=()=>{
    let total=0;
    this.state.totalPrices.forEach(item=>{
        total+=item;
    })
    this.setState(()=>{
        return {total}
    })
}


openModal=id=>{
    let product=this.state.products.find(x=>x.id===id);
    this.setState(()=>{
        return {
            modalProduct:product,
            showModal:true,
            
        }
    })
}


getProductAttributes=(id,attributeName,itemValue)=>{
    let tempProducts=[];
    this.state.products.forEach(item=>{
        const singleProduct={...item};
        tempProducts.push(singleProduct);
    })
    const product=tempProducts.find(x=>x.id===id)

   
    
    if(product!==undefined && product?.selected?.find(x=>x.name===attributeName)||product?.selected==undefined) {
        if(product?.selected==undefined) {
            product.selected=[];
            product?.selected.push(
               { name:attributeName,
                optionSelected:itemValue
                }
            )
        }else{
            
            product.selected=product.selected.filter(x=>x.name!==attributeName);
            product.selected.push({
                name:attributeName,
                optionSelected:itemValue
            })
        }
       
    }else if(product!==undefined && attributeName!==product.selected.find(x=>x.name) ) {
            product.selected=[...product.selected,{
                name:attributeName,
                optionSelected:itemValue
            }]
    }

    this.setState(()=>{
        return {
            products:tempProducts
        }
    })

}

checkAttributes=id=>{
    const product=this.state.products.find(x=>x.id===id);
    if(product.hasOwnProperty("selected")&&product.selected.length===product.attributes.length||product.attributes.length===0) {
        this.addInCart(id);
        this.increment(id);
        this.setState(()=>{
            return {
                showModal:false
            }
        })
    }else{
       this.setState(()=>{
           return {
               errorMessage:"Some attributes are not selected.Please select all of them",
           }
       })
        
    }
}

checkCart=id=>{
    const product=this.state.cartContent.find(x=>x.id===id);
    if(product!==undefined) {
        return true;
    }else{
        return false;
    }
}

changeAttribute=(id)=>{
    let tempCart=[...this.state.cartContent];
    let product=tempCart.find(x=>x.id===id);
    let product2=this.state.products.find(x=>x.id===id);
    product.selected=product2.selected;
    this.setState(()=>{
      return { cartContent:tempCart}
    })
    

    
    
    this.setState(()=>{
        return {
            cartContent:tempCart,
            showModal:false
        
        }
    })
    
    
}



render() {
return (
  <Context.Provider value={{...this.state,showHideCurrency:this.showHideCurrency,changeCurrency:this.changeCurrency,selectMainImage:this.selectMainImage,addToCart:this.addToCart,showHideCartOverlay:this.showHideCartOverlay,increment:this.increment,decrement:this.decrement,getTotalPrice:this.getTotalPrice,addInCart:this.addInCart,inCart:this.inCart,getProductAttributes:this.getProductAttributes,openModal:this.openModal,checkAttributes:this.checkAttributes,handleDetails:this.handeDetails,checkCart:this.checkCart,changeAttribute:this.changeAttribute}}>{this.props.children}</Context.Provider>
)
}
}

const ContextConsumer=Context.Consumer;


export {ContextProvider,ContextConsumer}

