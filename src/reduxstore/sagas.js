import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
const api_base = process.env.REACT_APP_BASE_URL
toast.configure()


//=============LOGIN====================
function loginn(action) {
    return axios({
        method: "post",
        url: api_base + "login",
        data: action.payload
    })
}

function* LoginGenerator(action) {

    yield put({ type: 'LOGIN_PROGRESS' })
    var result = yield call(loginn, action)
    // based on result of task
    // we will dispatch differenet type of requests
    if (result.data.token) {
        yield put({ type: 'LOGIN_SUCCESS', payload: result.data })
        toast.success(result.data.message)

        var statee = yield select(function (state) {
            return state
        })
        if (statee.isloggedin) {

        }
    } else {
        yield put({ type: 'LOGIN_FAILURE' })
        toast.error(result.data.message)
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
        url: api_base + "allcakes",
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

export function* userInitSaga() {
    yield takeEvery('USER_INIT', UserGenerator)
}

export function* UserGenerator(action) {
    var result = yield call(user_init, action)
    if (result?.data) {
        yield put({ type: 'INITIALIZE_USER', payload: result.data.data })

        if (result?.data?.data?.token) {
            var cart_result = yield call(user_cart, action)
            yield put({ type: 'CART_DATA', payload: cart_result.data.data })
        }
    }
}

function user_init(action) {
    var token = localStorage.token
    return axios({
        url: api_base + 'getuserdetails',
        method: "get",
        headers: {
            authtoken: token
        }
    })
}

function user_cart(action) {
    var token = localStorage.token
    return axios({
        url: api_base + 'cakecart',
        method: "post",
        headers: {
            authtoken: token
        }
    })
}
//==============initialize user =======================

function getCakeDetail(action) {
    return axios({
        method: "get",
        url: api_base + "allcakes",
    })
}

export function* CakeDetailSaga() {
    yield takeEvery('cakeDetail', detailGenerator)
}

function* detailGenerator(action) {
    var result = yield call(getCakeDetail, action)
    if (result.data.data > 0) {
        yield put({ type: 'CAKE_DETAIL', payload: result.data.data })
    }

}
/*export function* OrderSaga(){
    yield takeEvery('ADD_ORDER', LoginGenerator)
    yield takeEvery('FETCH_ORDER')
}

export function* RootSaga(){
    yield all([LoginSaga(),OrderSaga()])
}
*/