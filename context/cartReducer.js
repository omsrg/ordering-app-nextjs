export const initialState = {
    products: [],
    quantity: 0,
    total: 0,
};

export const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'ADD_TO_CART':
            return {
                products: payload.products,
                quantity: payload.quantity,
                total: payload.total,
            };
        case 'RESET_CART':
            return {
                products: payload.products,
                quantity: payload.quantity,
                total: payload.total,
            };
        case 'REMOVE_FROM_CART':
            // console.log('new Cart: ', payload);
            return {
                products: payload.products,
                quantity: payload.quantity,
                total: payload.total,
            };
        default:
            throw new Error(`No case for type ${type} found in cartReducer `);
    }
};
