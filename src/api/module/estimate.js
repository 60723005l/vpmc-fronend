import axios from "axios";
// const cors = 'https://cors-anywhere.herokuapp.com/';

/**
 * @param {{county: '桃園市', town: 'town', transactionInterval: '1995/1/1-2021/12/31', assertType: '華廈', totalUnitsInterval: '0-1000', age: 50}} params
 * @returns {Promise<{"transactionSerialNumber": ["RPOOMLKKKIPFFEH28DA"]}>}
 */
 export const getComparativeCases = async (params) => {
  const url = process.env.BASE_API_URL + 'Estimate/Compare'
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