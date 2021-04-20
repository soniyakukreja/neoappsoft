var demo = function(state={
    user:null
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
            console.log('newstate',state)
            return state

        }
        case "LOGOUT" : {
            state = {...state}
            localStorage.clear()
            // state['isloggedin'] = false
            // state['user'] = false

            delete state['isloggedin']
            delete state['user']
            delete state['cart_data']
            return state

        }

        case "CART_DATA" : {
            state = {...state}
            //console.log('cartdata-recuer',action)
            state['cart_data'] = action.payload
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