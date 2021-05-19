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