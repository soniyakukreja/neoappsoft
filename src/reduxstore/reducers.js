var demo = function(state={
    user:null,checkout_stage:1
}, action){ // state - data of store
    switch(action.type){
        case "INITIALIZE_USER" : {
            state = {...state}
            state['isloggedin'] = true
            state['user'] = action.payload
            return state

        }
        case "CHECKOUT_STAGE": {
            state = {...state}
            state['checkout_stage'] = action.payload
            console.log('after state',state)
            return state

        }
        case "LOGIN" : {
            state = {...state}
            state['isloggedin'] = true
            state['user'] = action.payload
            return state

        }
        case "LOGOUT" : {
            state = {...state}
            localStorage.clear()
            delete state['isloggedin']
            delete state['user']
            delete state['user_cart']
            return state
        }

        case "CART_DATA" : {
            state = {...state}
            state['user_cart'] = action.payload
            state['cart_data_length']= state['user_cart'].length
            return state
        }

        case "ADD_CART_DATA" : {
            state = {...state}
            var new_cake = action.payload
            var cart_old_data = state['user_cart']
            state['user_cart'] = [...cart_old_data, new_cake]
            state['cart_data_length']= state['user_cart'].length
            return state
        }

        case "REMOVE_CART_DATA" : {
            state = {...state}
            //state['user_cart'].splice(action.payload, 1)
            state['user_cart']= state.user_cart.filter((x) => x.cakeid !== action.payload)
            state['cart_data_length']= state['user_cart'].length
            return state

        }
        default : return state
    }

}

export default demo