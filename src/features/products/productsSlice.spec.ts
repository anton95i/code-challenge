import productsReducer, { ProductsState, addProducts } from "./productsSlice";

describe("products reducer", () => {
  const initialState: ProductsState = {
    value: [
      {
        id: 1,
        name: "Test",
        price: 1.99,
      },
    ],
    status: "idle",
  };
  it("should handle initial state", () => {
    expect(productsReducer(undefined, { type: "unknown" })).toEqual({
      value: [],
      status: "idle",
    });
  });

  it("should handle new Products", () => {
    const actual = productsReducer(initialState, addProducts("Test2,2.99"));
    expect(actual.value).toEqual([
      {
        id: 1,
        name: "Test",
        price: 1.99,
      },
      {
        id: 2,
        name: "Test2",
        price: 2.99,
      },
    ]);
  });

  it("should handle new Products with invalid input", () => {
    const actual = productsReducer(initialState, addProducts("Test2,2.99,Test3"));
    expect(actual.value).toEqual([
      {
        id: 1,
        name: "Test",
        price: 1.99,
      },
      {
        id: 2,
        name: "Test2",
        price: 2.99,
      },
    ]);
  });

  it("should handle new Products without price", () => {
    const actual = productsReducer(initialState, addProducts("Test2,Test3,Test4,"));
    expect(actual.value).toEqual([
      {
        id: 1,
        name: "Test",
        price: 1.99,
      }
    ]);
  });

});
