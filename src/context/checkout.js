import React, { useReducer, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const CHECKOUT_STEPS = {
  CART: "cart",
};

const initialState = {
  step: CHECKOUT_STEPS.CART,
  creditCart: null,
};

export const CheckoutStateContext = createContext();
export const CheckoutDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CHECKOUT_STEP":
      return {
        ...state,
        step: action.payload.step,
      };
    case "SET_CART":
      return {
        ...state,
        creditCart: action.payload.creditCart,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

const CheckoutProvider = ({ children }) => {
  const [checkoutState, setCheckoutState] = useLocalStorage("checkout", null);
  const persistedCheckoutState = {
    ...initialState,
    creditCart: checkoutState || {},
  };
  const [state, dispatch] = useReducer(reducer, persistedCheckoutState);

  useEffect(() => {
    setCheckoutState(state.creditCart);
  }, [state.creditCart]);
  return (
    <CheckoutDispatchContext.Provider value={dispatch}>
      <CheckoutStateContext.Provider value={state}>
        {children}
      </CheckoutStateContext.Provider>
    </CheckoutDispatchContext.Provider>
  );
};

export const setCheckoutStep = (dispatch, step) => {
  return dispatch({
    type: "SET_CHECKOUT_STEP",
    payload: {
      step,
    },
  });
};

export const saveCreditCard = (dispatch, creditCart) => {
  dispatch({
    type: "SET_CART",
    payload: {
      creditCart,
    },
  });
  return setCheckoutStep(dispatch, CHECKOUT_STEPS.CART);
};

export default CheckoutProvider;
