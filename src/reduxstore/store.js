import {createStore} from "redux"
import demo from "./reducers"

var store = createStore(demo)


//param of dispatch() will be actions,
// actions are plain js objects with a key known as type
// console.log("..... before ", store.getState())

// store.dispatch({ 
    
//     // This will call reducer(means demo fn) to get the state if the action type matches
//     type:"LOGIN",
//     payload:{email:"soniyakukreja091@gmail.com", name: "soiya kukreja"}
// })
// console.log("..... after login match: ", store.getState())

export default store