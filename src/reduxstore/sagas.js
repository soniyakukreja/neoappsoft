import axios from "axios"
import { all, call, put, select, takeEvery } from 'redux-saga/effects'

//=============LOGIN====================
function login(action) {
    return axios({
        method: "post",
        url: "https://apibyashu.herokuapp.com/api/login",
        data: action.payload
    })
}

function* LoginGenerator(action) {
    var result = yield call(login, action)
    console.log('login saga line15',result)

    // based on result of task
    // we will dispatch differenet type of requests
    if (result.data.token) {
        yield put({ type: 'LOGIN_SUCCESS', payload: result.data })
        // yield call(GET_CART_DATA,action)

        var statee = yield select(function (state) {
            return state
        })
        if (statee.isloggedin) {

        }
    } else {
        yield put({ type: 'LOGIN_FAILURE' })
        console.log('LOGIN_FAILURE put')
    }
}

export function* LoginSaga() {
    yield takeEvery('LOGIN', LoginGenerator)
}
//=============LOGIN END====================


//=============GET HOME CAKES ====================

function getCakes(action) {
    return axios({
        method: "get",
        url: "https://apibyashu.herokuapp.com/api/allcakes",
    })
}

export function* AllCakesSaga() {
    yield takeEvery('AllCakes', CakeGenerator)
}
function* CakeGenerator(action) {
    var result = yield call(getCakes, action)

    if (result.data.data.length > 0) {
        yield put({ type: 'CAKES_RECEIVED', payload: result.data })
    }

}

//=============END GET HOME CAKES  ====================

//==============initialize user =======================

export function* userInitSaga(){
    yield takeEvery('USER_INIT',UserGenerator)
}

export function* UserGenerator(action){
    var result = yield call(user_init,action)
    if(result?.data){
        yield put({ type: 'INITIALIZE_USER', payload: result.data.data })

        if(result?.data?.data?.token){
            var cart_result = yield call(user_cart,action)
            yield put({ type: 'CART_DATA', payload: cart_result.data.data })
        }
    }
}

function user_init(action){
    var token = localStorage.token 
    // console.log('token>>>> in userinit>>>>',token)
    return axios({
    url:'https://apibyashu.herokuapp.com/api/getuserdetails',
    method:"get",
    headers : {
        authtoken: token
    }
    })
}

function user_cart(action){
    var token = localStorage.token 
    return axios({
    url:'https://apibyashu.herokuapp.com/api/cakecart',
    method:"post",
    headers : {
        authtoken: token
    }
    })
}
//==============initialize user =======================


/*export function* OrderSaga(){
    yield takeEvery('ADD_ORDER', LoginGenerator)
    yield takeEvery('FETCH_ORDER')
}

export function* RootSaga(){
    yield all([LoginSaga(),OrderSaga()])
}
*/