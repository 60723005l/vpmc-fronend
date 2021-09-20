import axios from "axios";
// const cors = 'https://cors-anywhere.herokuapp.com/';
/**
 * 
 * @param {String} payload.username
 * @param {String} payload.password
 * 
 */
export const login = async ( payload ) =>
{
    let url = process.env.BASE_API_URL+'JwtAuth/authenticate'
    try
    {
        let resp = await axios.post(url, payload, { withCredentials: true }) //cookies will be written when withCredentials true
        console.log(resp)
        return resp.data
    }
    catch(err)
    {
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
 export const register = async ( payload ) =>
 {
    let url = process.env.BASE_API_URL+'JwtAuth/authenticate'
    let resp = await axios.post(url, payload)
    return resp.text()
 }

 export const validate = async ( token ) =>
 {
     let url = process.env.BASE_API_URL + 'JwtAuth/validate?token=' + token
     try{
        let resp = await axios.get(url)
        return resp.data
     }
     catch(err){
         return Promise.reject(err)
     }
     
 }