import React, { useReducer, createContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState = {
  items: [],
};

export const CardStateContext = createContext();
export const CardDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CARD":
      const id = action.payload.cardItem.id;
      const isQuantity = state.items.map((item) => item.id).includes(id);
      let cardItems = null;
      if (isQuantity) {
        const items = state.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
        cardItems = [...items];
      } else {
        cardItems = [...state.items, action.payload.cardItem];
      }
      return {
        ...state,
        items: cardItems,
      };
    case "REMOVE_FROM_CARD":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.payload.cardItemId
        ),
      };
    case "CLEAR_CARD":
      return {
        ...state,
        ...initialState,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const addToCard = (dispatch, cardItem) => {
  return dispatch({
    type: "ADD_TO_CARD",
    payload: {
      cardItem: cardItem,
    },
  });
};

export const removeFromCard = (dispatch, cardItemId) => {
  return dispatch({
    type: "REMOVE_FROM_CARD",
    payload: {
      cardItemId: cardItemId,
    },
  });
};

export const clearCard = (dispatch) => {
  return dispatch({
    type: "CLEAR_CARD",
  });
};

const CardProvider = ({ children }) => {
  const [persistedCardItems, setPersistedCardItems] = useLocalStorage(
    "cardItems",
    []
  );
  const persistedCardState = {
    isCardOpen: false,
    items: persistedCardItems || [],
  };
  const [state, dispatch] = useReducer(reducer, persistedCardState);
  useEffect(() => {
    setPersistedCardItems(state.items);
  }, [JSON.stringify(state.items)]);
  return (
    <CardDispatchContext.Provider value={dispatch}>
      <CardStateContext.Provider value={state}>
        {children}
      </CardStateContext.Provider>
    </CardDispatchContext.Provider>
  );
};

export default CardProvider;
