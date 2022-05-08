import React, { Component } from 'react'
import styled from 'styled-components'
import { ContextConsumer } from '../../context'
const CurrencyMenu=styled.div`
    width:115px;
    height:150px;
    cursor:pointer;
    display:flex;
    flex-direction:column;
    position:absolute;
    right:1rem;
    top:75px;
    z-index:9;
    transition:all 1s ease;


    .currency {
        text-align:center;
        font-sie:18px;
        font-weight:600;
        padding:10px;
        &:hover {
            background:#EEEEEE;
        }
    }
`

export default class CurrencyNav extends Component {
  render() {
    return (
        <CurrencyMenu>
      <ContextConsumer>
          {value=>(
              value.showSwitcher? value.currency?.map(currency=>(
                <span onClick={()=>value.changeCurrency(currency.symbol)} className="currency">{currency.label} {currency.symbol}</span>
            )):null
          )}
      </ContextConsumer>
      </CurrencyMenu>
    )
  }
}



