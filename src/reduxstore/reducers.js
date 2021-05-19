var demo = function (state = {
        user: null,
        islogginerror: false,
        user_cart: [],
        loading: true,
        current_check_step: 1,
        done_check_steps: 0
    }, action) { // state - data of store
    switch (action.type) {
        case "CHECKOUT_STAGE": {
            state = { ...state }
            state['done_check_steps'] = action.payload
            return state
        }
        case "INITIALIZE_USER": {
            state = { ...state }
            state['isloggedin'] = true
            state['user'] = action.payload
            state['done_check_steps'] = 0
            return state
        }

        case "FORGOT_SUCCESS": {
            state = { ...state }
            state['reset_mail_sent'] = action.payload
            return state
        }
        case "FORGOT_Fail": {
            state = { ...state }
            state['forgot_err'] = action.payload
            return state
        }
        case "UPDATE_CURRENT_CHECKOUT_STEP": {
            state = { ...state }
            state['current_check_step'] = action.payload
            return state
        }

        case "LOGIN": {
            state = { ...state }
            state['loading'] = false
            return state
        }
        case "HELLO": {
            console.log('hello reducer')
            state = { ...state }
            state['hello'] = "soniya"
            return state
        }

        case "FORGOT_PASSWORD_INIT": {
            state = { ...state }
            state['isfetching'] = false
            return state
        }

        case "LOGIN_SUCCESS": {
            state = { ...state }
            state['isloggedin'] = true
            state['user'] = action.payload
            state['loading'] = false
            state['islogginerror'] = false
            localStorage.token = action.payload.token
            return state
        }
        case "LOGIN_PROGRESS": {
            state = { ...state }
            state['loading'] = true
            console.log('loading progress', state)
            return state
        }
        case "LOGIN_FAILURE": {
            state = { ...state }
            state['loading'] = false
            state['islogginerror'] = true
            return state
        }



        case "LOGOUT": {
            state = { ...state }
            localStorage.clear()
            delete state['isloggedin']
            delete state['user']
            delete state['user_cart']
            return state
        }

        case "CART_DATA": {
            state = { ...state }
            state['user_cart'] = action.payload
            state['cart_data_length'] = state['user_cart'].length
            return state
        }

        case "ADD_CART_DATA": {
            state = { ...state }
            var new_cake = action.payload
            var cart_old_data = state['user_cart']
            state['user_cart'] = [...cart_old_data, new_cake]
            state['cart_data_length'] = state['user_cart'].length
            return state
        }

        case "REMOVE_CART_DATA": {
            state = { ...state }
            //state['user_cart'].splice(action.payload, 1)
            state['user_cart'] = state.user_cart.filter((x, y) =>
                //(x.cakeid !== action.payload && y !== action.array_index)
                y !== action.array_index
            )
            state['cart_data_length'] = state['user_cart'].length
            return state

        }
        case "UPDATE_CART_TOTAL": {
            state = { ...state }
            state['cart_total_price'] = action.payload
            return state
        }
        case "SAVE_ADDRESS": {
            state = { ...state }
            state['address'] = action.payload
            state['done_check_steps'] = 2
            return state
        }
        case "SAVE_PAYMODE": {
            state = { ...state }
            state['done_check_steps'] = 3
            console.log('state', state)
            return state
        }
        case "ORDER_DONE": {
            state = { ...state }
            state['user_cart'] = ''
            state['cart_data_length'] = 0
            state['cart_total_price'] = 0
            return state
        }

        case "CAKES_RECEIVED": {
            state = { ...state }
            state['cakes'] = action.payload.data
            state['loading'] = false
            return state
        }
        case "CAKE_DETAIL":{
            console.log('cakedetail',action.payload.data)
            state = { ...state }
            state['cakedetail'] = action.payload.data
            state['loading'] = false
            return state
        }
        default: return state
    }

}

export default demo