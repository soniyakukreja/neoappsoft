var demo = function(state={
    user:null,
    cart_data : null
}, action){ // state - data of store
    switch(action.type){
        case "INITIALIZE_USER" : {
            state = {...state}
            state['isloggedin'] = true
            state['user'] = action.payload
            return state

        }
        case "LOGIN" : {
            console.log("Here we have to write login logic")
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
            return state

        }

        case "CART_DATA" : {
            state = {...state}
            state['cart_data'] = action.cart_data
            return state

        }

        case "ADD_CART_DATA" : {
            state = {...state}
            var new_cake = action.new_cake
            var cart_old_data = state['cart_data']
            state['cart_data'] = [...cart_old_data, new_cake]
            return state
        }

        case "REMOVE_CART_DATA" : {
            state = {...state}
            state['cart_data'].splice(action.array_index, 1)
            
            return state

        }
        default : return state
    }

}

export default demo