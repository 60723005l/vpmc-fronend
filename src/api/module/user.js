import axios from "axios";
// const cors = 'https://cors-anywhere.herokuapp.com/';
/**
 * 
 * @param {String} payload.username
 * @param {String} payload.password
 * 
 */
export const login = async (payload) => {
    let url = process.env.BASE_API_URL + 'JwtAuth/authenticate'
    try {
        let resp = await axios.post(url, payload, { withCredentials: true }) //cookies will be written when withCredentials true
        console.log(resp)
        return resp.data
    }
    catch (err) {
        return Promise.reject(err)
    }
}

/**
 * 
 * @param {String} payload.username
 * @param {String} payload.password
 * @param {String} payload.email
 * @param {String} payload.phoneNumber
 * 
 */
export const register = async (payload) => {
    try {
        let url = process.env.BASE_API_URL + 'JwtAuth/register'
        await axios.post(url, payload)
        return 'ok'
    } catch ( error ) {
        return Promise.reject(error)
    }
}

/**
 * 
 * @param {*} token 
 * @returns {Promise<{
 * UserID:'xxxx',UserName:'xxoo',UserRole:'Admin' | 'Guest',
 * nbf:'1632490293',exp:'1632501093',iat:'1632490293'}>}
 */
export const validate = async (token) => {
    let url = process.env.BASE_API_URL + 'JwtAuth/validate?token=' + token
    try {
        let resp = await axios.get(url)
        return fixCrapJson(resp.data)
    }
    catch (err) {
        return Promise.reject(err)
    }

}

function fixCrapJson ( crappyJSON ) {
    let fixedJSON_key = crappyJSON.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
    let fixedJSON_value = fixedJSON_key.replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?,/g, '"$2", ');
    return JSON.parse(fixedJSON_value)
}