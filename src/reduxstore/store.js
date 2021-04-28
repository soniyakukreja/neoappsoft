import {createStore,applyMiddleware} from "redux"
import demo from "./reducers"
import createSaga from "redux-saga"
import {LoginSaga, AllCakesSaga, userInitSaga} from "./sagas"
//import thunk from "redux-thunk"


var sagaMiddleware = createSaga()

//var middlewares = applyMiddleware(thunk,sagaMiddleware)
var middlewares = applyMiddleware(sagaMiddleware)


export default createStore(demo,middlewares)
sagaMiddleware.run(LoginSaga)

sagaMiddleware.run(AllCakesSaga)
sagaMiddleware.run(userInitSaga)