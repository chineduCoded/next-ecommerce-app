import { createContext, useContext, useReducer } from "react"
import Cookies from "js-cookie"

export const Store = createContext()

const initialState = {
    cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")) : []
}

const storeReducer = (state, action) => {
    switch (action.type) {
        case "ADD_CART_ITEM": {
            const newItem = action.payload
            const existItem = state.cartItems.find(item => item._id === newItem._id)
            const cartItems = existItem ? state.cartItems.map((item) => item._id === existItem._id ? newItem : item) : [...state.cartItems, newItem]

            Cookies.set("cartItems", JSON.stringify(cartItems))
            return { ...state, cartItems }
        }

        case "REMOVE_FROM_CART":
            return {
                ...state,
                cartItems: state.cartItems.filter((c) => c._id !== action.payload._id)
            }

        default:
            throw new Error(`Invalid action ${action.type}`)
    }
}


export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState)
    const value = { state, dispatch }
    return (
        <Store.Provider value={value}>
            {children}
        </Store.Provider>
    )
}

export const useStore = () => {
    return useContext(Store)
}



// return {
//     ...state,
//     cartItems: [...state.cartItems, { ...action.payload, qty: 1 }]
// }