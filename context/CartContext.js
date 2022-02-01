import { createContext, useContext, useReducer } from 'react';

export const CartContext = createContext({});

export const useCartContext = () => {
    return useContext(CartContext);
};

const initialState = {
    products: [],
    quantity: 0,
    total: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return {
                products: [...state.products, action.payload],
                quantity: (state.quantity += 1),
                total: (state.total +=
                    action.payload.price * action.payload.quantity),
            };
        case 'CLEAR_PRODUCT':
            return {
                products: [],
                quantity: 0,
                total: 0,
            };
        default:
            throw new Error(
                `No case for type ${action.type} found in cartReducer `
            );
    }
};

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
