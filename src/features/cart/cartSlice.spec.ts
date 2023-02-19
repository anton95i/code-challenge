import cartReducer, { CartState, addToCart, deleteProduct, increment, decrement } from "./cartSlice";

describe("cart reducer", () => {
  const initialState: CartState = {
    value: [
      {
        productId: 1,
        name: "Test",
        amount: 1,
        price: 1.99,
      },
    ],
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({
      value: [],
      status: "idle",
    });
  });

  it("should handle add to cart", () => {
    const actual = cartReducer(initialState, addToCart("2,Test2,2.99"));
    expect(actual.value).toEqual([
      {
        productId: 1,
        name: "Test",
        amount: 1,
        price: 1.99,
      },
      {
        productId: 2,
        name: "Test2",
        amount: 1,
        price: 2.99,
      },
    ]);
  });

  it("should handle increment", () => {
    const actual = cartReducer(initialState, increment(1));
    expect(actual.value[0].amount).toEqual(2);
  });

  it("should handle decrement", () => {
    const actual = cartReducer(initialState, increment(1));
    expect(actual.value[0].amount).toEqual(2);
    const actual2 = cartReducer(actual, decrement(1));
    expect(actual2.value[0].amount).toEqual(1);
  });

  it("should handle delete product", () => {
    const actual = cartReducer(initialState, deleteProduct(1));
    expect(actual.value).toEqual([]);
  });
});
