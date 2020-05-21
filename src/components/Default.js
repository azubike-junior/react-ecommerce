import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-10 mx-auto text-center text-title text-uppercase pt-5'>
                        <h2 className='display-3'>404</h2>
                        <h2>error</h2>
                        <h3>page not found the requested URL
                            <span className='text-danger'>
                                {this.props.location.pathname}
                            </span>{' '}
                            was not found
                        </h3>
                    </div>
                </div>
            </div>
        )
    }
}
