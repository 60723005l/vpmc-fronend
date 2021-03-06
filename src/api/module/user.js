import axios from "axios";
import util from "tweetnacl-util";
import sha256 from "fast-sha256";
// const cors = 'https://cors-anywhere.herokuapp.com/';
/**
 * 
 * @param {String} payload.email
 * @param {String} payload.password
 * 
 */
export const login = async (payload) => {
    const url = process.env.BASE_API_URL_V2 + 'api/Auth/authenticate'
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    // console.log(util.encodeBase64(sha256(payload.password)))
    const bodyContent = `email=${payload.email}&password=${util.encodeBase64(sha256(payload.password))}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: bodyContent,
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }
    // try {
    //     let resp = await axios.post(url, payload, { withCredentials: true }) //cookies will be written when withCredentials true
    //     console.log(resp)
    //     return resp.data
    // }
    // catch (err) {
    //     return Promise.reject(err)
    // }
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
    const url = process.env.BASE_API_URL_V2 + 'api/User/register'
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const bodyContent = `username=${payload.username}&password=${util.encodeBase64(sha256(payload.password))}&email=${payload.email}&phoneNumber=${payload.phoneNumber}&roleId=1`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: bodyContent,
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }
    // try {
    //     let url = process.env.BASE_API_URL + 'JwtAuth/register'
    //     await axios.post(url, payload)
    //     return 'ok'
    // } catch (error) {
    //     return Promise.reject(error)
    // }
}

/**
 * @param {*} token
 */
export const validate = async (token) => {
    const url = process.env.BASE_API_URL_V2 + 'api/Auth/validate'
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const bodyContent = `token=${token}`;
    const response = await fetch(url, {
        method: 'POST',
        body: bodyContent,
        headers: headersList
    })
    return response
    // try {
    //     let resp = await axios.get(url)
    //     return fixCrapJson(resp.data)
    // }
    // catch (err) {
    //     return Promise.reject(err)
    // }

}

export const sendVerifyEmail = async (username) => {
    const url = process.env.BASE_API_URL_V2 + `api/User/sendVerifyEmail?username=${username}`
    const headersList = {
        Accept: '*/*'
    }
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }
}

export const sendForgetPasswordEmail = async (email) => {
    const url = process.env.BASE_API_URL_V2 + `api/User/sendPasswordResetEmail?email=${email}`
    const headersList = {
        Accept: '*/*',
    }
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }
}

export const resetPassword = async (options) => {
    const url = process.env.BASE_API_URL_V2 + `api/User/resetPassword`
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const bodyContent = `email=${options.email}&originalPassword=${util.encodeBase64(sha256(options.originalPassword))}&newPassword=${util.encodeBase64(sha256(options.newPassword))}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: bodyContent,
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }

}

function fixCrapJson (crappyJSON) {
    let fixedJSON_key = crappyJSON.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ');
    let fixedJSON_value = fixedJSON_key.replace(/(['"])?([a-zA-Z0-9_-]+)(['"])?,/g, '"$2", ');
    return JSON.parse(fixedJSON_value)
}