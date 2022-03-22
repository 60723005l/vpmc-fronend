import axios from "axios";
// const cors = 'https://cors-anywhere.herokuapp.com/';

/**@interface */
export const RegionHistoryReturnItemType = {
    "住宅大樓(11層含以上有電梯)": {
        "counts": {
            "95": 4.0,
            "102": 25.0,
            "105": 35.0,
            "106": 12.0,
            "109": 27.0,
            "110": 2.0
        },
        "totalPrice": {
            "95": 10600000.0,
            "102": 8054000.0,
            "105": 8839428.57142857,
            "106": 8081666.666666667,
            "109": 9117407.407407407,
            "110": 12075000.0
        },
        "unitPrice": {
            "95": 56683.12109375,
            "102": 51489.66015625,
            "105": 55374.1640625,
            "106": 52036.171875,
            "109": 71751.9921875,
            "110": 84191.3046875
        },
        "age": {
            "95": 16.0,
            "102": 9.0,
            "105": 6.0,
            "106": 5.0,
            "109": 2.0,
            "110": 1.0
        }
    },
    "店面(店鋪)": {
        "counts": {
            "95": 1.0,
            "102": 1.0
        },
        "totalPrice": {
            "95": 6200000.0,
            "102": 8200000.0
        },
        "unitPrice": {
            "95": 120411.7265625,
            "102": 77497.3984375
        },
        "age": {
            "95": 16.0,
            "102": 9.0
        }
    },
    "華廈(10層含以下有電梯)": {
        "counts": {
            "109": 2.0
        },
        "totalPrice": {
            "109": 9650000.0
        },
        "unitPrice": {
            "109": 80979.140625
        },
        "age": {
            "109": 2.0
        }
    }
}

/**@interface */
export const CommiteeHistroyRetureType =[
    {
        "transactionDate": "2021-08-14",
        "transferLevel": 2,
        "units": "45838.26㎡",
        "totalPrice": 9400000,
        "unitPrice": 57704.113,
        "bathNumber": 2,
        "bedNumber": 3,
        "hallNumber": 2
    }
]

/**
 * @param {{county: '桃園市', town: 'town', village: 'village'}} params
 * @returns {Promise<["百川文哲社區管理委員會","百川文哲社區管理委員會"]>}
 */
 export const getRegionHistory = async (params) => {
  const url = process.env.BASE_API_URL + 'Transaction/getRegionHistory'
  const config = {
      method: 'get',
      url,
      params,
      headers: { }
    }
  try {
      const resp = (await axios(config)).data
      console.log(resp)
      return resp
  }
  catch (err) {
      return Promise.reject(err)
  }
}

/**
 * @param {{county: '桃園市', town: 'town', village: 'village'}} params
 * @returns {Promise<["百川文哲社區管理委員會","百川文哲社區管理委員會"]>}
 */
export const getCommittee = async (params) => {
    const url = process.env.BASE_API_URL + 'Transaction/getCommittee'
    const config = {
        method: 'get',
        url,
        params,
        headers: { }
      }
    try {
        const resp = (await axios(config)).data
        return resp
    }
    catch (err) {
        return Promise.reject(err)
    }
}

/**
 * @param {{name: '百川文哲社區管理委員會'}} params
 * @returns {Promise<[{
 * "transactionDate": "2021-08-14",
 * "transferLevel": 2,
 * "units": "45838.26㎡",
 * "totalPrice": 9400000,
 * "unitPrice": 57704.113,
 * "bathNumber": 2,
 * "bedNumber": 3,
 * "hallNumber": 2
 * }]>}
 */
 export const getCommitteeHistory = async (params) => {
    const url = process.env.BASE_API_URL + 'Transaction/getCommitteeHistory'
    const config = {
        method: 'get',
        url,
        params: { committeeName: params.name },
        headers: { }
      }
    try {
        const resp = (await axios(config)).data
        return resp
    }
    catch (err) {
        return Promise.reject(err)
    }
}

/**@interface */
export const GetByExtenResp = [{
    "id": "RPOOMLKKKHPFFCH87CA",
    "nonMetroLandUseDistrict": "鄉村區",
    "landTransactionAmount": 1,
    "buildingTransactionAmount": 1,
    "parkTransactionAmount": 1,
    "totalFloorNumber": 7,
    "buildingMaterial": "鋼筋混凝土造",
    "transactionSign": "房地(土地+建物)+車位",
    "nonMetroLandUse": "乙種建築用地",
    "transactionDate": "1081207",
    "completionDate": "951129",
    "shiftingLevel": "三層",
    "parsedShiftingLevel": 3,
    "buildingState": "華廈(10層含以下有電梯)",
    "parkCategory": "坡道平面",
    "mainUse": "住家用",
    "address": "桃園市大溪區齋明街８號三樓",
    "landUse": "nan",
    "town": "大溪區",
    "note": "含增建或未登記建物。；",
    "buildingShiftingArea": 145.7,
    "landShiftingArea": 33.7,
    "mainBuildingArea": 79.34,
    "parkShiftingArea": 0,
    "subBuildingArea": 3.86,
    "parkTotalPrice": 0,
    "belconyArea": 9.5,
    "totalPrice": 5750000,
    "unitPrice": 39464.652,
    "bathNumber": 2,
    "bedNumber": 3,
    "hallNumber": 2,
    "hasManageOrganization": "TRUE",
    "hasCompartmented": "TRUE",
    "hasElevator": "FALSE",
    "coordinateX": 2753096,
    "coordinateY": 277317
}]

/**
 * 
 * @param {{ xmin: Number, xmax: Number, ymin: Number, ymax: Number }} params 
 * @returns 
 */
export const getByExtent = async (params) => {
    const url = process.env.BASE_API_URL + 'Transaction/getExtentData'
    const config = {
        method: 'get',
        url,
        params,
        headers: { }
      }
    try {
        const resp = (await axios(config)).data
        return resp
    }
    catch (err) {
        return Promise.reject(err)
    }
}
