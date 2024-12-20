import { useRouter } from "next/router";
import React, { useReducer } from "react";
const initialState = { count: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }bnvb
}
function ProductPriceCount({ price }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const currentRoute = useRouter().pathname;
  const increment = () => {
    dispatch({ type: "increment" });
  };

  const decrement = () => {
    if (state.count > 1) {
      dispatch({ type: "decrement" });
    }
  };
  return (
    <div className="product-total d-flex align-items-center">
      <div className="quantity">
        <div className="quantity d-flex align-items-center">
          <div className="quantity-nav nice-number d-flex align-items-center">
            <button onClick={decrement} type="button">
              <i className="bi bi-dash"></i>
            </button>
            <span
              style={{
                margin: "0 15px",
                fontFamily: "var(--font-cabin)",
                color: "var(--title-color1)",
                fontSize: "16px",
              }}
            >
              {state.count}
            </span>
            <button onClick={increment} type="button">
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </div>
      {currentRoute === "/shop-details" ? (
        ""
      ) : (
        <strong>
          {" "}
          <i className="bi bi-x-lg px-2" />
          <span
            className="product-price"
            style={{
              margin: "0 px",
              fontFamily: "var(--font-cabin)",
              color: "var(--title-color1)",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            {state.count * price} dt
          </span>
        </strong>
      )}
    </div>
  );
}
export default ProductPriceCount;
