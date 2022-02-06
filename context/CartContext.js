import { createContext, useContext, useReducer } from 'react';
import { cartReducer, initialState } from './cartReducer';

export const CartContext = createContext(initialState);

export const useCartContext = () => {
    return useContext(CartContext);
};

export const CartContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        const updatedProducts = [...state.products, product];
        const updatedQuantity = (state.quantity += 1);
        const updatedTotal = (state.total += product.price * product.quantity);

        dispatch({
            type: 'ADD_TO_CART',
            payload: {
                products: updatedProducts,
                quantity: updatedQuantity,
                total: updatedTotal,
            },
        });
    };

    const removeFromCart = (product) => {
        const updatedProducts = state.products.filter(
            (currentItem) => currentItem._id !== product._id
        );
        const updatedQuantity = (state.quantity -= 1);
        const updatedTotal = (state.total -= product.price * product.quantity);

        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: {
                products: updatedProducts,
                quantity: updatedQuantity,
                total: updatedTotal,
            },
        });
    };

    const reset = () => {
        dispatch({
            type: 'RESET_CART',
            payload: {
                products: [],
                quantity: 0,
                total: 0,
            },
        });
    };

    const value = {
        products: state.products,
        quantity: state.quantity,
        total: state.total,
        addToCart,
        removeFromCart,
        reset,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
