// const cors = 'https://cors-anywhere.herokuapp.com/';
/**
 * 
 * @param {String} payload.username
 * @param {String} payload.password
 * 
 */
export const login = ( payload ) =>
{
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify(payload);
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        credentials: 'include'
    };

    return new Promise( ( res, rej ) =>
    {
        fetch(process.env.BASE_API_URL+'JwtAuth/authenticate', requestOptions)
        .then( resp => resp.text())
        .then( resp => res(resp))
        .catch( err => rej(err))
    } )

}

/**
 * 
 * @param {String} payload.username
 * @param {String} payload.password
 * @param {String} payload.email
 * @param {String} payload.phoneNumber
 * 
 */
 export const register = ( payload ) =>
 {
     let myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");
 
     let raw = JSON.stringify(payload);
     let requestOptions = {
         method: 'POST',
         headers: myHeaders,
         body: raw,
         redirect: 'follow',
         credentials: 'include'
     };
     return new Promise( ( res, rej ) =>
    {
        fetch(process.env.BASE_API_URL+'JwtAuth/register', requestOptions)
        .then( resp => resp.text())
        .then( resp => res(resp))
        .catch( err => rej(err))
    } )
 }