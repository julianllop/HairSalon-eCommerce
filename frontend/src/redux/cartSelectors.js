export const selectCartItemCount = (state) => {
    return state.cart.cart
        ? state.cart.cart.products.reduce(
              (count, product) => count + product.CartItem.quantity,
              0
          )
        : 0;
};
