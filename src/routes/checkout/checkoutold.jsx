<div className="checkout-container">
  <div className="checkout-header">
    <div className="headr-block">
      <span>Product</span>
    </div>
    <div className="headr-block">
      <span>Description</span>
    </div>
    <div className="headr-block">
      <span>Quantity</span>
    </div>
    <div className="headr-block">
      <span>Price</span>
    </div>
    <div className="headr-block">
      <span>Remove</span>
    </div>
  </div>
  <div>
    {/* {cartItems.map((cartItem) => {
    const { id, name, quantity } = cartItem;
    return (
      <div key={id}>
        <h2>{name}</h2>
        <span>{quantity}</span>
        <br />
        <span onClick={() => removeItemFromCart(cartItem)}>
          decrement
        </span>
        <br />
        <span onClick={() => addItemToCart(cartItem)}>increment</span>
      </div>
    );
  })} */}
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">Total:${cartTotal}</div>
  </div>
</div>;
