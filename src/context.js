import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data'

const productContext = React.createContext()

class ProductProvider extends Component {
    state={
        products: [], 
        detailProduct: detailProduct,
        cart: [],
        modalOpen:false,
        modalProduct: detailProduct,
        cartSubtotal: 0,
        cartTax:0,
        cartTotal:0
    }

    componentDidMount(){
        this.setProducts()
    }

    setProducts =() =>{
        let tempProducts = [];
        storeProducts.forEach(item => {
            const singleItem = {...item}
            tempProducts = [...tempProducts, singleItem];
        })
        this.setState(() => {
            return {products: tempProducts}
        })
    }

    getItem = id => {
        const item = this.state.products.find(item => item.id === id);
        return item;
    }

    handleDetail = (id) => {
        const products = this.getItem(id);
       return this.setState({
            detailProduct: products
        })
    }

    addToCart = (id) => {
       const tempProducts = [...this.state.products]
       const index = tempProducts.indexOf(this.getItem(id))
       const product = tempProducts[index]
       product.inCart = true;
       product.count = 1;
       const price = product.price;
       product.total = price
        this.setState(() => {
            return {products:tempProducts, cart:[...this.state.cart, product]}
        }, () => this.addTotals())
    }

    openModal = (id) => {
        const product = this.getItem(id)
        this.setState(() => {
          return {modalProduct:product, modalOpen:true}
        })
    }

    closeModal = () => {
        this.setState(() => {
            return {modalOpen: false}
        })
    }

    clearCart = () => {
        this.setState(() => {
           return { cart : [] }
        }, ()=> {
            this.setProducts();
            this.addTotals()
        })
    }

    increment = (id) => {
        const tempCart = [...this.state.cart]
        const singleItem = tempCart.find(item => item.id === id);
        const index = tempCart.indexOf(singleItem);

        let product = tempCart[index]
        product.count = product.count + 1;
        product.total = product.count * product.price;

        this.setState(() => {
            return {
                cart : [...tempCart]
            }
        },() => {this.addTotals()})
    } 

    decrement = (id) => {
        const tempCart = [...this.state.cart]
        const singleItem = tempCart.find(item => item.id === id);
        
        const index = tempCart.indexOf(singleItem);
        let product = tempCart[index]
        product.count = product.count - 1;
        if(product.count === 0){
            this.removeItem(id);
        }else{
            product.total = product.count * product.price;
            this.setState(() => {
                return {
                    cart : [...tempCart]
                }
            },() => {this.addTotals()})
        }
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.products];
        let tempCart = [...this.state.cart]
       
        tempCart = tempCart.filter(item => item.id !== id);
        const index = tempProducts.indexOf(this.getItem(id))
        const removeProduct = tempProducts[index];
        removeProduct.inCart = false;
        removeProduct.count = 0;
        removeProduct.total = 0;
        this.setState(() => {
            return {
                cart:[...tempCart],
                product: [...tempProducts]
            }
        }, () => {this.addTotals()})
   }

    addTotals = () => {
        let subTotal = 0;
        this.state.cart.map(item => (subTotal += item.total ))
        const tempTax = subTotal * 0.1;
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax;
        this.setState(() => {
            return {
                cartSubtotal: subTotal,
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    render() {
        return (
            <productContext.Provider value={{
                ...this.state,
                handleDetail: this.handleDetail,
                addToCart: this.addToCart,
                openModal: this.openModal,
                closeModal: this.closeModal,
                increment: this.increment,
                decrement: this.decrement,
                clearCart: this.clearCart,
                removeItem: this.removeItem
            }}>
                {this.props.children}
            </productContext.Provider>
        )
    }
}
const ProductConsumer = productContext.Consumer

export {ProductConsumer, ProductProvider}