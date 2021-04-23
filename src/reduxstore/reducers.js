var demo = function(state={
    user:null,checkout_step:1,clicked_step:1,
    current_check_step:1,
    done_check_steps:0
}, action){ // state - data of store
    switch(action.type){
        case "INITIALIZE_USER" : {
            state = {...state}
            state['isloggedin'] = true
            state['user'] = action.payload
            return state

        }


        case "UPDATE_CURRENT_CHECKOUT_STEP" : {
            state = {...state}

            state['current_check_step']= action.payload
            // if(action?.step_no)
            //     state['checkout_step'] = action.step_no
            // if(action?.click_no)
            //     state['clicked_step'] = action.click_no
            
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