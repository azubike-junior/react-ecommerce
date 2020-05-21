import React, { Component } from 'react'
import './App.css';
import {Route, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Details from './components/Details'
import Default from './components/Default'
import Cart from './components/Cart'
import Modal from './components/Modal'


export class App extends Component {
  render() {
    return (
      <div>
        <React.Fragment>
          <Navbar/>
          <Switch>
          <Route exact path='/' component={ProductList}/>
          <Route path='/Details' component={Details} />
          <Route path='/cart' component={Cart} />
          <Route component={Default} />
          </Switch>
        </React.Fragment>
        <Modal/>
      </div>
    )
  }
}

export default App
