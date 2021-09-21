import axios from "axios";
import { groupBy, keys } from "lodash";

// const cors = 'https://cors-anywhere.herokuapp.com/';
/**
 * 
 * @param {String} oAPPId: "KUELVYPeym2WwQ/0/HegdG3SAC3+KlK/czjeAeDNoOhGlKMYXiwF2w==",
 * @param {String} oAPIKey: "cGEErDNy5yNr14zbs',
 * @param {String} oAddress: '',
 * @param {String} oSRS: 'EPSG:4326',
 * @param {String} oFuzzyType: "0",
 * @param {String} oResultDataType: "JSON",
 * @param {String} oFuzzyBuffer: "0",
 * @param {String} oIsOnlyFullMatch: "false",
 * @param {String} oIsLockCounty: "false",
 * @param {String} oIsLockTown: "false",
 * @param {String} oIsLockVillage: "false",
 * @param {String} oIsLockRoadSection: "false",
 * @param {String} oIsLockLane: "false",
 * @param {String} oIsLockAlley: "false",
 * @param {String} oIsLockArea: "false",
 * @param {String} oIsSameNumber_SubNumber: "false",
 * @param {String} oCanIgnoreVillage: "false",
 * @param {String} oCanIgnoreNeighborhood: "false",
 * @param {String} oReturnMaxCount: "0"
 * 
 */
export const getGeoinfoFromAddr = async ( payload ) =>
{
    let url = 'https://addr.tgos.tw/addrws/v30/QueryAddr.asmx/QueryAddr'
    let defaultPayload = {
        oAPPId: "KUELVYPeym2WwQ/0/HegdG3SAC3+KlK/czjeAeDNoOhGlKMYXiwF2w==",
        oAPIKey: "cGEErDNy5yNr14zbsE/4GSfiGP5i3PuZV86ivQhFbPPOjUQyVRvWeDwZ2P+l7QtVuX0D5JwdyKFoY0wlnh3vgviaOvHKSW6+aKkWncRUaAvXwFT6lgNQGrNUMk8yQnZh5xBSfQy5wu06OF8ZDRWbo9IH5KiRf8bbZeup6dXH87K+Hpxf8xDiRiuCCOf+2sLgwX/YA6pCE+yp7eGrdqaM1LVy6nO2rF+cm0/e7/BCtkyQkE+RY+Vum8MEdPmuRXuCgvafAsI/6kgCyrlIGL68JSJcy459+XvS8qGn6+0XjLwHHs8rb09JjXCEfSuI2hPzzh4yXEY5KK9Yc+5H9JuY9B8Ts/kXd6+BSko2w86Aht4JbO6vP+M8KA==",
        oAddress: '',
        oSRS: 'EPSG:4326',
        oFuzzyType: "0",
        oResultDataType: "JSON",
        oFuzzyBuffer: "0",
        oIsOnlyFullMatch: "false",
        oIsLockCounty: "false",
        oIsLockTown: "false",
        oIsLockVillage: "false",
        oIsLockRoadSection: "false",
        oIsLockLane: "false",
        oIsLockAlley: "false",
        oIsLockArea: "false",
        oIsSameNumber_SubNumber: "false",
        oCanIgnoreVillage: "false",
        oCanIgnoreNeighborhood: "false",
        oReturnMaxCount: "0"
    }
    let params = {...defaultPayload, ...payload}
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
    let searchParam = new URLSearchParams(params)
    try
    {
        // let resp = await axios.get(url, {params, headers} )
        let resp = await axios.post(url, searchParam.toString(), {headers})
        console.log(resp)
        const parser = new DOMParser()
        const root = parser.parseFromString(resp.data, "text/xml")
        const result = root.querySelector("string").innerHTML
        return JSON.parse(result)
    }
    catch(err)
    {
        return Promise.reject(err)
    }
}

/**
 * 
 * @param {String} oAPPId: "KUELVYPeym2WwQ/0/HegdG3SAC3+KlK/czjeAeDNoOhGlKMYXiwF2w==",
 * @param {String} oAPIKey: "cGEErDNy5yNr14zbs',
 * @param {String} oPX: '',
 * @param {String} oPY: '',
 * @param {String} oSRS: 'EPSG:4326',
 * @param {String} oResultDataType: "JSON",
 * 
 */
 export const getAddrfromXY = async ( payload ) =>
 {
     let url = 'https://addr.tgos.tw/addrws/v30/GeoQueryAddr.asmx/PointQueryNearAddr'
     let defaultPayload = {
        oAPPId: "hXnCKqbsocMgLj3nAtVZedsAzevpyFtw7AkTogtHPg6sm3axF7Lm2A==",
        oAPIKey: "cGEErDNy5yM+0u7x1r+mjNNXaL9xwf/Jj+MEyjWia+ONeXsFwFMSN5w9ZGM4oFPYZXUH45vh50Ko0nYxmAqemqHygV84bozSyloCC5XPUeqfQclPHEL0ZjXHhLjcBwZ4x9v9tDt9WEY4bFNfeKJvOycL1io9OE3/mLR7URCSdgRiSh5PN2yy48VMhYZVDVrrKkcPVSBo2UmjScTjbZeaFerZ5BUsN+XrpRr2FFz/rYV0stotKR5jyUU80HohSg9lfN3/8I5WlLxWvRqeQd0ynmTilDnthfiOpjZdJbjpIA8MpExbKbqJrUz+/eYOuoODo8KBuU9xTmCrwMYmUVz37vyzxyn3cTT+sRP8gYXHiWsKfph9UAijpA==",
        oPX: "",
        oPY: "",
        oSRS: "EPSG:4326",
        oResultDataType: "JSON"
     }
     let params = {...defaultPayload, ...payload}
     console.log(params)
     let headers = {
         'Content-Type': 'application/x-www-form-urlencoded',
     }
     let searchParam = new URLSearchParams(params)
     try
     {
         // let resp = await axios.get(url, {params, headers} )
         let resp = await axios.post(url, searchParam.toString(), {headers})
         console.log(resp)
         const parser = new DOMParser()
         const root = parser.parseFromString(resp.data, "text/xml")
         console.log(root)
         const result = root.querySelector("string").innerHTML
         return JSON.parse(result)
     }
     catch(err)
     {
         return Promise.reject(err)
     }
 }


/**
 * 
 * @param {String} oAPPId: "KUELVYPeym2WwQ/0/HegdG3SAC3+KlK/czjeAeDNoOhGlKMYXiwF2w==",
 * @param {String} oAPIKey: "cGEErDNy5yNr14zbs',
 * @param {String} oPX: '',
 * @param {String} oPY: '',
 * @param {String} oSRS: 'EPSG:4326',
 * @param {String} oResultDataType: "JSON",
 * 
 */
 export const getAdminGeoinfos = async ( payload ) =>
 {
     let url = `${window.location.origin}/static/adminGeoInfos.json`
     try
     {
         // let resp = await axios.get(url, {params, headers} )
         let resp = await axios.get(url)
         console.log(resp)
         let extendedInfos = resp.data.map(e=>({
             county: e["行政區名"].slice(0,3), 
             town: e["行政區名"].slice(3),
             latlng: [e["中心點緯度"], e["中心點經度"]]
            }))
         const adminGeoInfo = {
            value: groupBy(extendedInfos, "county"),
            get counties() {
                return keys(this.value)
            },
            getTownsInfoByCounty(county) {
                return this.value[county]
            }
         }
         return adminGeoInfo
     }
     catch(err)
     {
         return Promise.reject(err)
     }
 }