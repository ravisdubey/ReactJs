import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            // mutating state here
            state.items.push(action.payload);
        },
        removeItem: (state) => {
            state.items.pop();
        },
        clearCart: (state) => {
            // RTK - either mutate state or return new state
            // state.items.length = 0; // []

            return { items: [] }
        }
    }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;