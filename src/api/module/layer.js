import axios from "axios";
import basemaps from "../../assets/staticFile/basemaps.json"

/**
 * 
 * @param {String} payload.item GeneralLaw | Bulletin
 * 
 */
export const getBasemaps = async ( payload ) =>
{
    let url = `${window.location.origin}/static/basemaps.json`
    try
    {
        // let resp = await axios.get(url)
        // return resp.data
        return basemaps
    }
    catch(err)
    {
        return Promise.reject(err)
    }
}

export const getGeoLayers = async () => {
    return (await import('../../assets/staticFile/geoLayers.json'))
}