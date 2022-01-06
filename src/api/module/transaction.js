import axios from "axios";
// const cors = 'https://cors-anywhere.herokuapp.com/';

/**
 * @param {{county: '桃園市', town: 'town'}} params
 * @returns {Promise<["百川文哲社區管理委員會","百川文哲社區管理委員會"]>}
 */
 export const getRegionHistory = async (params) => {
  const url = process.env.BASE_API_URL + 'Transaction/getRegionHistory'
  const config = {
      method: 'get',
      url,
      params,
      headers: { }
    }
  try {
      const resp = JSON.stringify(await axios(config).data)
      console.log(resp)
      return resp
  }
  catch (err) {
      return Promise.reject(err)
  }
}

/**
 * @param {{county: '桃園市', town: 'town'}} params
 * @returns {Promise<["百川文哲社區管理委員會","百川文哲社區管理委員會"]>}
 */
export const getCommittee = async (params) => {
    const url = process.env.BASE_API_URL + 'Transaction/getCommittee'
    const config = {
        method: 'get',
        url,
        params,
        headers: { }
      }
    try {
        const resp = JSON.stringify(await axios(config).data)
        console.log(resp)
        return resp
    }
    catch (err) {
        return Promise.reject(err)
    }
}

/**
 * @param {{name: '百川文哲社區管理委員會'}} params
 * @returns {Promise<[{
 * "transactionDate": "2021-08-14",
 * "transferLevel": 2,
 * "units": "45838.26㎡",
 * "totalPrice": 9400000,
 * "unitPrice": 57704.113,
 * "bathNumber": 2,
 * "bedNumber": 3,
 * "hallNumber": 2
 * }]>}
 */
 export const getCommitteeHistory = async (params) => {
    const url = process.env.BASE_API_URL + 'Transaction/getCommitteeHistory'
    const config = {
        method: 'get',
        url,
        params: { committeeName: params.name },
        headers: { }
      }
    try {
        const resp = JSON.stringify(await axios(config).data)
        console.log(resp)
        return resp
    }
    catch (err) {
        return Promise.reject(err)
    }
}
