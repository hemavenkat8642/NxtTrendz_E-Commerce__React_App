// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalAmount = cartList
        .map(each => parseInt(each.quantity) * parseInt(each.price))
        .reduce((acc, curr) => acc + curr, 0)
      const noOfItems = cartList.length

      return (
        <div className="cart-summary">
          <h1 className="order-total">
            Order Total: <span className="total-amount">{totalAmount}/-</span>
          </h1>
          <p className="items-in-cart">{noOfItems} Items in cart</p>
          <button className="checkout-btn" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
