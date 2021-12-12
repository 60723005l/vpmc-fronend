import axios from "axios";
import basemaps from "../../assets/staticFile/basemaps.json"
// import realEstateLayers from '../../assets/staticFile/RealEstateLayers.json'

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

export const getRealEstateLayers = async () => {
    const buildingGeoJSON = (await import('../../assets/fakeAPI/license_geocoded.json'))
    console.log(buildingGeoJSON)
    return [
        {
            "name": "建物",
            "url": buildingGeoJSON,
            "group": "不動產交易資料圖層"
        }
    ]
}