import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  decrementCartItemQuantity = product => {
    const {cartList} = this.state
    const newList = cartList.filter(each => each.id !== product.id)
    if (product.quantity > 1) {
      const newProduct = {...product, quantity: product.quantity - 1}
      this.setState({cartList: [newProduct, ...newList]})
    } else {
      this.setState({cartList: [...newList]})
    }
  }

  incrementCartItemQuantity = product => {
    const {cartList} = this.state
    const newList = cartList.filter(each => each.id !== product.id)
    const newProduct = {...product, quantity: product.quantity + 1}
    this.setState({cartList: [newProduct, ...newList]})
  }

  addCartItem = product => {
    //   TODO: Update the code here to implement addCartItem
    const {cartList} = this.state
    const existingProduct = cartList.find(item => item.id === product.id)

    if (existingProduct) {
      existingProduct.quantity += product.quantity
      const newList = cartList.filter(each => each.id !== product.id)
      this.setState({cartList: [...newList, existingProduct]})
    } else {
      this.setState({cartList: [...cartList, product]})
    }
  }

  removeCartItem = productId => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.id !== productId),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
