import React, { Component } from 'react';
import {ProductConsumer} from '../context';
import {Link} from 'react-router-dom';
import {ButtonContainer} from './Button'

export default class Details extends Component {
    render() {
        return (
        <ProductConsumer>
            {(value) => {
                const {id, title, img, price, company, info, inCart} = value.detailProduct
                return (
                    <div className='container'>
                        <div className='row'>
                            <div className='col-10 mx-auto text-blue pt-5 pb-2 text-center'>
                                <h1>{title}</h1>
                            </div>
                        </div>
                            <div className='row'>
                                <div className='col-10 mx-auto col-md-6 '>
                                <img src={img} className='img-fluid' alt='product'/>
                                </div>
                                <div className='col-10 mx-auto col-md-6 my-3 text-capitalize'>
                                <h2>model: {title} </h2>
                                <h4 className='text-title text-uppercase text-muted mt-3 mb-2'>
                                    made by: <span className='text-uppercase'>
                                        {company}
                                    </span>
                                </h4>
                                <h4 className='text-blue'>
                                    <strong>
                                        price: <span>$</span>
                                        {price}
                                    </strong>
                                </h4>
                                <h5 className='text-capitalize font-weight-bold mt-3 mb-0'>
                                    some info about the product:
                                    <p className='text-muted lead'>{info}</p>
                                </h5>
                                <div>
                                    <Link to='/' >
                                        <ButtonContainer>Back to home</ButtonContainer>
                                    </Link>
                                    <ButtonContainer cart disabled={inCart ? true : false} onClick={() => {
                                       value.addToCart(id);
                                       value.openModal(id)
                                    }}>
                                        {inCart ? 'in cart' : 'add to cart'}
                                    </ButtonContainer>
                                </div>
                                </div>
                            </div>
                    </div>
                )
            }} 
        </ProductConsumer>
        )
    }
}
