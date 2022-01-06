import axios from "axios";
import { UrlBuilder } from "../url-builder";
// const cors = 'https://cors-anywhere.herokuapp.com/';

/**
 * 
 * @returns {Promise<["嘉義市","桃園市"]>}
 */
export const getAllCounties = async () => {
    const url = process.env.BASE_API_URL + 'Utility/getCounty'
    const config = {
        method: 'get',
        url,
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
 * @param {{county: '桃園市'}} params
 * @returns {Promise<["嘉義市","桃園市"]>}
 */
 export const getTownFromCounty = async (params) => {
    const url = process.env.BASE_API_URL + 'Utility/getTown'
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
 * @param {{county: '桃園市', town: '中壢區'}} params
 * @returns {Promise<["嘉義市","桃園市"]>}
 */
 export const getVillageFromCountyTown = async (params) => {
    const url = process.env.BASE_API_URL + 'Utility/getVillage'
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