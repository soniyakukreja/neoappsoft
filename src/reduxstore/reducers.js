var demo = function(state={
    user:null,
    isloggedin:false,
    user_cart:[],

    checkout_step:1,clicked_step:1,
    current_check_step:1,
    done_check_steps:0
}, action){ // state - data of store
    switch(action.type){
        //before saga===
        // case "LOGIN" : {
        //     state = {...state}
        //     state['isloggedin'] = true
        //     state['user'] = action.payload
        //     return state

        // }
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
            state['isfetching'] = false
            return state
        }

        case "LOGIN_SUCCESS":{
            state = {...state}
            state['isloggedin'] = true
            state['user'] = action.payload
            state['isfetching'] = false
            state['islogginerror']= false
            localStorage.token = action.payload.token
            return state
        }
        case "LOGIN_FAILURE":{
            state = {...state}
            state['isfetching'] = false
            state['islogginerror']= true
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
            state['user_cart']= state.user_cart.filter((x,y) => 
             //(x.cakeid !== action.payload && y !== action.array_index)
             y !== action.array_index
            )
            state['cart_data_length']= state['user_cart'].length
            return state

        }
        case "UPDATE_CART_TOTAL" :{
            state = {...state}
            state['cart_total_price']= action.payload
            return state
        }
        case "SAVE_ADDRESS" : {
            state = {...state}
            state['address']= action.payload
            return state
        }
        case "ORDER_DONE"  :{
            state = {...state}
            state['user_cart']= ''
            state['cart_data_length'] = 0
            state['cart_total_price']= 0
            return state
        }

        case "CAKES_RECEIVED" : {
            state = {...state}
            state['cakes'] = action.payload.data
            return state
        }
        default : return state
    }

}

export default demo