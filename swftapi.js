import axios from 'axios'

let api = 'https://transfer.swft.pro/'
/* let curTime;
let responseTime;

// 增加axios拦截
axios.interceptors.response.use(
    (suc) => {
      responseTime  = new Date().getTime()
      console.log('lgy', suc.request.res.responseUrl + '响应时间：' + (responseTime - curTime)/1000)
      //console.log("lgy", suc.data)
      if (suc.status == '200') {
        if (suc.data.resCode != '900') {
          return Promise.resolve(suc.data)
        }
      } else {
        return Promise.resolve(suc.statusText)
      }
      
    },
    (error) => {
      console.log('lgy', error)
      return Promise.reject(error.data, error.resCode)
    },
) */

    /**
   * @param {string} url 请求地址
   * @param {Object} data 请求参数
   * @param {string} method  http请求方式
   */  
function createRequest(url, data, method) {
  method = method || 'post'
  if (method.toLowerCase() === 'get') {
    let params = ''
    Object.keys(data).forEach(function(key) {
      if (data[key]) {
        let value = data[key]
        params += key + '=' + value + '&'
      }
    })
    if (params.length > 0) {
      params = params.substr(0, params.length - 1)
      url += '?' + params
      data = {}
    }
  }
  data = JSON.stringify(data)
  let curTime = new Date().getTime()
  axios({
    url: api + url,
    method: method,
    data: data,
    dataType: 'json',
    timeout: 500000,
    headers: {
        'Content-Type': 'application/json',
    }
  })
  .then((json) => {
    let endTime = new Date().getTime()
    console.log(url + '    =====TIME:::', (endTime - curTime)/1000 + ' s')
    console.log('body', json)
  })
  .catch((err) => {
    let endTime = new Date().getTime()
    console.log(err + '    =====TIME:::', (endTime - curTime)/1000 + ' s')
    console.log('err', err)
  })
}
function newBaseRequestData() {
  let data = {
    equipmentNo: 'd158f94d56586899c258662ef65a9002',
    sourceType: 'ANDROID',
    coinType: ''
  }
  return data
}

function queryCoinList() {
  createRequest('api/v1/queryCoinListByType', newBaseRequestData())
}

function getBaseInfo() {
    const obj = {
      ...newBaseRequestData(),
      depositCoinCode: 'BTC',
      receiveCoinCode: 'SWFTC',
      changeType: 'advanced'
    }
    createRequest('api/v1/getBaseInfo2', obj)
}

function queryAllTrade() {
    createRequest('api/v2/ios/queryAllTradeV3', newBaseRequestData())
}

queryCoinList()
//getBaseInfo()
//queryAllTrade()
