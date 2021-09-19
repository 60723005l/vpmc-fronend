import axios from "axios";
// const cors = 'https://cors-anywhere.herokuapp.com/';
/**
 * 
 * @param {String} payload.item GeneralLaw | Bulletin
 * 
 */
export const getLawFiles = async ( payload ) =>
{
    let url = process.env.BASE_API_URL+'StaticFile/getFiles'
    let defaultPayload = {
        item: 'GeneralLaw'
    }
    let params = {...defaultPayload, ...payload}
    try
    {
        let resp = await axios.get(url, {params})
        return resp.data
    }
    catch(err)
    {
        return Promise.reject(err)
    }
}