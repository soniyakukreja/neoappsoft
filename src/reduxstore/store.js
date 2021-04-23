import {createStore,applyMiddleware} from "redux"
import demo from "./reducers"
import {FirstMiddleWare} from "./Middleware"

// var middlewares = applyMiddleware(FirstMiddleWare)

// var store = createStore(demo,middlewares)
var store = createStore(demo)


export default store