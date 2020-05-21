import React, { Component } from 'react'
import logo from '../logo.svg'
import {Link} from 'react-router-dom'
import {ButtonContainer, NavWrapper} from './Button'

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <NavWrapper className='navbar navbar-expand-sm navbar-dark px-sm-5'>
                <Link to='/'>
                    <img src={logo} alt='store' className='navbar-brand'/>
                </Link>
                <ul className='navbar-nav align-items-center'>
                    <li className='nav-item ml-5'>
                        <Link to='/' className='nav-link'>
                        products
                        </Link>
                    </li>
                </ul>
                <Link to='/cart' className='ml-auto'>
                    <ButtonContainer>
                        <span className='mr-2'>
                        <i className='fa fa-cart-plus' />
                        </span>
                        my cart
                    </ButtonContainer>
                </Link>
                </NavWrapper>
            </div>
        )
    }
}

