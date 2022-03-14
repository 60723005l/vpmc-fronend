
export const listAllByUser = async () => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/listDataSheets?token=${localStorage.getItem("token")}`
    const headersList = {
        Accept: '*/*',
    }
    const response = await fetch(url, {
        method: "GET",
        headers: headersList
    })
    return response
}

export const deleteLandSheetById = async (_sheetId) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/deleteLandSheet`
    const headersList = {
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    let bodyContent = `token=${localStorage.getItem("token")}&_sheetId=${_sheetId}`;
    const response = await fetch(url, {
        method: "DELETE",
        body: bodyContent,
        headers: headersList
    })
    return response
}

export const listCountys = async () => {
    // const url = process.env.BASE_API_URL + "Utility/getCounty"
    const url = 'http://localhost:5000/api/Utility/getCounty'
    const headersList = {
        Accept: '*/*'
    }
    const response = await fetch(url, {
        method: "GET",
        headers: headersList
    })
    return response
}

export const listVillageByCounty = async (county) => {
    // const url = process.env.BASE_API_URL + `Utility/getTown?county=${county}`
    const url = `http://localhost:5000/api/Utility/getTown?county=${county}`
    let headersList = {
        Accept: '*/*'
    }
    const response = await fetch(url, {
        method: "GET",
        headers: headersList
    })
    return response
}

export const createLandSheet = async (landSheet) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/createLandSheet`
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    // console.log('====================')
    // console.log(landSheet.transcriptFileName)
    const bodyContent = `token=${localStorage.getItem("token")}&assetType=${'土地'}&landMarkCounty=${landSheet.objectContent.landMark.county}&landMarkVillage=${landSheet.objectContent.landMark.village}&landMarkName=${landSheet.objectContent.landMark.name}&landMarkCode=${landSheet.objectContent.landMark.code}&buildMarkCounty=${landSheet.objectContent.buildMark.county}&buildMarkVillage=${landSheet.objectContent.buildMark.village}&buildMarkName=${landSheet.objectContent.buildMark.name}&buildMarkCode=${landSheet.objectContent.buildMark.code}&buildAddressCounty=${landSheet.objectContent.address.county}&buildAddressVillage=${landSheet.objectContent.address.village}&buildAddress=${landSheet.objectContent.address.address}&landArea=${landSheet.objectContent.landArea}&landRightsOwner=${landSheet.propertyAnalysis.rightOwner}&landRightsStatus=${landSheet.propertyAnalysis.rightStatus}&landRightsHolding=${landSheet.propertyAnalysis.rightHolding}&otherRights=${landSheet.propertyAnalysis.otherRights}&landUses=${landSheet.currentUsage.landUse}&BuildingCoverageRatio=${landSheet.currentUsage.coverageRatio}&floorAreaRatio=${landSheet.currentUsage.floorAreaRatio}&inspectionDate=${landSheet.surveyDates.inspectionDate}&valueOpinionDate=${landSheet.surveyDates.valueOpinionDate}&appraisalObject=${landSheet.appraisalObject.appraisalObject}&appraisalDescription=${landSheet.appraisalObject.appraisalDescription}&priceType=${landSheet.estimateCondition.priceType}&evaluationRightsType=${landSheet.estimateCondition.evaluationRightsType}&appraisalCondition=${landSheet.estimateCondition.appraisalCondition}&surveyorName=${landSheet.surveyDescription.surveyorName}&surveyDescription=${landSheet.surveyDescription.surveyDescription}&transcriptFileBase64=${encodeURIComponent(landSheet.transcriptFile)}&photoFilesBase64=${encodeURIComponent(landSheet.photoFiles)}&transcriptFileName=${landSheet.transcriptFileName}&photoFilesName=${landSheet.photoFilesName}`;
    console.log(bodyContent)
    const response = await fetch(url, {
        method: "POST",
        body: bodyContent,
        headers: headersList
    })
    return response
}

export const editLandSheet = async (landSheet, _sheetId) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/editLandSheet`
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const bodyContent = `token=${localStorage.getItem("token")}&assetType=${'土地'}&landMarkCounty=${landSheet.objectContent.landMark.county}&landMarkVillage=${landSheet.objectContent.landMark.village}&landMarkName=${landSheet.objectContent.landMark.name}&landMarkCode=${landSheet.objectContent.landMark.code}&buildMarkCounty=${landSheet.objectContent.buildMark.county}&buildMarkVillage=${landSheet.objectContent.buildMark.village}&buildMarkName=${landSheet.objectContent.buildMark.name}&buildMarkCode=${landSheet.objectContent.buildMark.code}&buildAddressCounty=${landSheet.objectContent.address.county}&buildAddressVillage=${landSheet.objectContent.address.village}&buildAddress=${landSheet.objectContent.address.address}&landArea=${landSheet.objectContent.landArea}&landRightsOwner=${landSheet.propertyAnalysis.rightOwner}&landRightsStatus=${landSheet.propertyAnalysis.rightStatus}&landRightsHolding=${landSheet.propertyAnalysis.rightHolding}&otherRights=${landSheet.propertyAnalysis.otherRights}&landUses=${landSheet.currentUsage.landUse}&BuildingCoverageRatio=${landSheet.currentUsage.coverageRatio}&floorAreaRatio=${landSheet.currentUsage.floorAreaRatio}&inspectionDate=${landSheet.surveyDates.inspectionDate}&valueOpinionDate=${landSheet.surveyDates.valueOpinionDate}&appraisalObject=${landSheet.appraisalObject.appraisalObject}&appraisalDescription=${landSheet.appraisalObject.appraisalDescription}&priceType=${landSheet.estimateCondition.priceType}&evaluationRightsType=${landSheet.estimateCondition.evaluationRightsType}&appraisalCondition=${landSheet.estimateCondition.appraisalCondition}&surveyorName=${landSheet.surveyDescription.surveyorName}&surveyDescription=${landSheet.surveyDescription.surveyDescription}&transcriptFileBase64=${encodeURIComponent(landSheet.transcriptFile)}&photoFilesBase64=${encodeURIComponent(landSheet.photoFiles)}&transcriptFileName=${landSheet.transcriptFileName}&photoFilesName=${landSheet.photoFilesName}&_sheetId=${_sheetId}`;
    const response = await fetch(url, {
        method: "PUT",
        body: bodyContent,
        headers: headersList
    })
    return response
}
