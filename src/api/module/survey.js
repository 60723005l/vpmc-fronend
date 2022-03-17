
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

export const listCountys = async () => {
    // const url = process.env.BASE_API_URL + "Utility/getCounty"OIUYIYUI
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

// Land CRUD

export const createLandSheet = async (landSheet) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/createLandSheet`
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const photoFilesEncoded = []
    for (let i = 0; i < landSheet.photoFiles.length; i++) {

        photoFilesEncoded.push(encodeURIComponent(landSheet.photoFiles[i]))
    }
    const bodyContent = `token=${localStorage.getItem("token")}&assetType=${'建物'}&landMarkCounty=${landSheet.objectContent.landMark.county}&landMarkVillage=${landSheet.objectContent.landMark.village}&landMarkName=${landSheet.objectContent.landMark.name}&landMarkCode=${landSheet.objectContent.landMark.code}&buildMarkCounty=${landSheet.objectContent.buildMark.county}&buildMarkVillage=${landSheet.objectContent.buildMark.village}&buildMarkName=${landSheet.objectContent.buildMark.name}&buildMarkCode=${landSheet.objectContent.buildMark.code}&buildAddressCounty=${landSheet.objectContent.address.county}&buildAddressVillage=${landSheet.objectContent.address.village}&buildAddress=${landSheet.objectContent.address.address}&landArea=${landSheet.objectContent.landArea}&landRightsOwner=${landSheet.propertyAnalysis.rightOwner}&landRightsStatus=${landSheet.propertyAnalysis.rightStatus}&landRightsHolding=${landSheet.propertyAnalysis.rightHolding}&otherRights=${landSheet.propertyAnalysis.otherRights}&landUses=${landSheet.currentUsage.landUse}&BuildingCoverageRatio=${landSheet.currentUsage.coverageRatio}&floorAreaRatio=${landSheet.currentUsage.floorAreaRatio}&inspectionDate=${landSheet.surveyDates.inspectionDate}&valueOpinionDate=${landSheet.surveyDates.valueOpinionDate}&appraisalObject=${landSheet.appraisalObject.appraisalObject}&appraisalDescription=${landSheet.appraisalObject.appraisalDescription}&priceType=${landSheet.estimateCondition.priceType}&evaluationRightsType=${landSheet.estimateCondition.evaluationRightsType}&appraisalCondition=${landSheet.estimateCondition.appraisalCondition}&surveyorName=${landSheet.surveyDescription.surveyorName}&surveyDescription=${landSheet.surveyDescription.surveyDescription}&transcriptFileBase64=${encodeURIComponent(landSheet.transcriptFile)}&photoFilesBase64=${JSON.stringify(photoFilesEncoded)}&transcriptFileName=${landSheet.transcriptFileName}&photoFilesName=${landSheet.photoFilesName}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }
}

export const editLandSheet = async (landSheet, _sheetId) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/editLandSheet`
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const photoFilesEncoded = []
    for (let i = 0; i < landSheet.photoFiles.length; i++) {
        photoFilesEncoded.push(encodeURIComponent(landSheet.photoFiles[i]))
    }
    const bodyContent = `token=${localStorage.getItem("token")}&assetType=${'土地'}&landMarkCounty=${landSheet.objectContent.landMark.county}&landMarkVillage=${landSheet.objectContent.landMark.village}&landMarkName=${landSheet.objectContent.landMark.name}&landMarkCode=${landSheet.objectContent.landMark.code}&buildMarkCounty=${landSheet.objectContent.buildMark.county}&buildMarkVillage=${landSheet.objectContent.buildMark.village}&buildMarkName=${landSheet.objectContent.buildMark.name}&buildMarkCode=${landSheet.objectContent.buildMark.code}&buildAddressCounty=${landSheet.objectContent.address.county}&buildAddressVillage=${landSheet.objectContent.address.village}&buildAddress=${landSheet.objectContent.address.address}&landArea=${landSheet.objectContent.landArea}&landRightsOwner=${landSheet.propertyAnalysis.rightOwner}&landRightsStatus=${landSheet.propertyAnalysis.rightStatus}&landRightsHolding=${landSheet.propertyAnalysis.rightHolding}&otherRights=${landSheet.propertyAnalysis.otherRights}&landUses=${landSheet.currentUsage.landUse}&BuildingCoverageRatio=${landSheet.currentUsage.coverageRatio}&floorAreaRatio=${landSheet.currentUsage.floorAreaRatio}&inspectionDate=${landSheet.surveyDates.inspectionDate}&valueOpinionDate=${landSheet.surveyDates.valueOpinionDate}&appraisalObject=${landSheet.appraisalObject.appraisalObject}&appraisalDescription=${landSheet.appraisalObject.appraisalDescription}&priceType=${landSheet.estimateCondition.priceType}&evaluationRightsType=${landSheet.estimateCondition.evaluationRightsType}&appraisalCondition=${landSheet.estimateCondition.appraisalCondition}&surveyorName=${landSheet.surveyDescription.surveyorName}&surveyDescription=${landSheet.surveyDescription.surveyDescription}&transcriptFileBase64=${encodeURIComponent(landSheet.transcriptFile)}&photoFilesBase64=${JSON.stringify(photoFilesEncoded)}&transcriptFileName=${landSheet.transcriptFileName}&photoFilesName=${landSheet.photoFilesName}&_sheetId=${_sheetId}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }
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

// Building CRUD

export const createBuildingSheet = async (buildSheet) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/createBuildingSheet`
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const photoFilesEncoded = []
    for (let i = 0; i < buildSheet.photoFiles.length; i++) {
        photoFilesEncoded.push(encodeURIComponent(buildSheet.photoFiles[i]))
    }
    console.log(photoFilesEncoded)
    const bodyContent = `token=${localStorage.getItem("token")}&assetType=${'土地'}&landMarkCounty=${buildSheet.objectContent.landMark.county}&landMarkVillage=${buildSheet.objectContent.landMark.village}&landMarkName=${buildSheet.objectContent.landMark.name}&landMarkCode=${buildSheet.objectContent.landMark.code}&buildMarkCounty=${buildSheet.objectContent.buildMark.county}&buildMarkVillage=${buildSheet.objectContent.buildMark.village}&buildMarkName=${buildSheet.objectContent.buildMark.name}&buildMarkCode=${buildSheet.objectContent.buildMark.code}&buildAddressCounty=${buildSheet.objectContent.address.county}&buildAddressVillage=${buildSheet.objectContent.address.village}&buildAddress=${buildSheet.objectContent.address.address}&landArea=${buildSheet.objectContent.landArea}&buildingArea=${buildSheet.objectContent.buildArea}&landRightsOwner=${buildSheet.propertyAnalysis.landRightsOwner}&landRightsStatus=${buildSheet.propertyAnalysis.landRightsStatus}&landRightsHolding=${buildSheet.propertyAnalysis.landRightsHolding}&buildingRightsOwner=${buildSheet.propertyAnalysis.buildingRightsOwner}&buildingRightsStatus=${buildSheet.propertyAnalysis.buildingRightsStatus}&buildingRightsHolding=${buildSheet.propertyAnalysis.buildingRightsHolding}&otherRights=${buildSheet.propertyAnalysis.otherRights}&landUses=${buildSheet.currentUsage.landUse}&BuildingCoverageRatio=${buildSheet.currentUsage.BuildingCoverageRatio}&floorAreaRatio=${buildSheet.currentUsage.floorAreaRatio}&buildingUsage=${buildSheet.currentUsage.buildingUsage}&buildingStructure=${buildSheet.currentUsage.buildingStructure}&buildingFinishDate=${buildSheet.currentUsage.buildingFinishDate}&buildingUpFloor=${buildSheet.currentUsage.buildingUpFloor}&buildingDownFloor=${buildSheet.currentUsage.buildingDownFloor}&surveyFloor=${buildSheet.currentUsage.surveyFloor}&inspectionDate=${buildSheet.surveyDates.inspectionDate}&valueOpinionDate=${buildSheet.surveyDates.valueOpinionDate}&appraisalObject=${buildSheet.appraisalObject.appraisalObject}&appraisalDescription=${buildSheet.appraisalObject.appraisalDescription}&priceType=${buildSheet.estimateCondition.priceType}&evaluationRightsType=${buildSheet.estimateCondition.evaluationRightsType}&appraisalCondition=${buildSheet.estimateCondition.appraisalCondition}&surveyorName=${buildSheet.surveyDescription.surveyorName}&surveyDescription=${buildSheet.surveyDescription.surveyDescription}&transcriptFileBase64=${encodeURIComponent(buildSheet.transcriptFile)}&photoFilesBase64=${JSON.stringify(photoFilesEncoded)}&transcriptFileName=${buildSheet.transcriptFileName}&photoFilesName=${buildSheet.photoFilesName}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }
}

export const editBuildingSheet = async (buildSheet, _sheetId) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/editBuildingSheet`
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const photoFilesEncoded = []
    for (let i = 0; i < buildSheet.photoFiles.length; i++) {
        photoFilesEncoded.push(encodeURIComponent(buildSheet.photoFiles[i]))
    }
    const bodyContent = `token=${localStorage.getItem("token")}&_sheetId=${_sheetId}&assetType=${'建物'}&landMarkCounty=${buildSheet.objectContent.landMark.county}&landMarkVillage=${buildSheet.objectContent.landMark.village}&landMarkName=${buildSheet.objectContent.landMark.name}&landMarkCode=${buildSheet.objectContent.landMark.code}&buildMarkCounty=${buildSheet.objectContent.buildMark.county}&buildMarkVillage=${buildSheet.objectContent.buildMark.village}&buildMarkName=${buildSheet.objectContent.buildMark.name}&buildMarkCode=${buildSheet.objectContent.buildMark.code}&buildAddressCounty=${buildSheet.objectContent.address.county}&buildAddressVillage=${buildSheet.objectContent.address.village}&buildAddress=${buildSheet.objectContent.address.address}&landArea=${buildSheet.objectContent.landArea}&buildingArea=${buildSheet.objectContent.buildArea}&landRightsOwner=${buildSheet.propertyAnalysis.landRightsOwner}&landRightsStatus=${buildSheet.propertyAnalysis.landRightsStatus}&landRightsHolding=${buildSheet.propertyAnalysis.landRightsHolding}&buildingRightsOwner=${buildSheet.propertyAnalysis.buildingRightsOwner}&buildingRightsStatus=${buildSheet.propertyAnalysis.buildingRightsStatus}&buildingRightsHolding=${buildSheet.propertyAnalysis.buildingRightsHolding}&otherRights=${buildSheet.propertyAnalysis.otherRights}&landUses=${buildSheet.currentUsage.landUse}&BuildingCoverageRatio=${buildSheet.currentUsage.BuildingCoverageRatio}&floorAreaRatio=${buildSheet.currentUsage.floorAreaRatio}&buildingUsage=${buildSheet.currentUsage.buildingUsage}&buildingStructure=${buildSheet.currentUsage.buildingStructure}&buildingFinishDate=${buildSheet.currentUsage.buildingFinishDate}&buildingUpFloor=${buildSheet.currentUsage.buildingUpFloor}&buildingDownFloor=${buildSheet.currentUsage.buildingDownFloor}&surveyFloor=${buildSheet.currentUsage.surveyFloor}&inspectionDate=${buildSheet.surveyDates.inspectionDate}&valueOpinionDate=${buildSheet.surveyDates.valueOpinionDate}&appraisalObject=${buildSheet.appraisalObject.appraisalObject}&appraisalDescription=${buildSheet.appraisalObject.appraisalDescription}&priceType=${buildSheet.estimateCondition.priceType}&evaluationRightsType=${buildSheet.estimateCondition.evaluationRightsType}&appraisalCondition=${buildSheet.estimateCondition.appraisalCondition}&surveyorName=${buildSheet.surveyDescription.surveyorName}&surveyDescription=${buildSheet.surveyDescription.surveyDescription}&transcriptFileBase64=${encodeURIComponent(buildSheet.transcriptFile)}&photoFilesBase64=${JSON.stringify(photoFilesEncoded)}&transcriptFileName=${buildSheet.transcriptFileName}&photoFilesName=${buildSheet.photoFilesName}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }
}

export const deleteBuildingSheetById = async (_sheetId) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/deleteBuildingSheet`
    const headersList = {
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    const bodyContent = `token=${localStorage.getItem("token")}&_sheetId=${_sheetId}`;
    const response = await fetch(url, {
        method: "DELETE",
        body: bodyContent,
        headers: headersList
    })
    return response
}

// Park CRUD

export const createParkSheet = async (parkSheet) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/createParkSheet`
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const photoFilesEncoded = []
    for (let i = 0; i < parkSheet.photoFiles.length; i++) {
        photoFilesEncoded.push(encodeURIComponent(parkSheet.photoFiles[i]))
    }
    const bodyContent = `token=${localStorage.getItem("token")}&assetType=${'停車位'}&landMarkCounty=${parkSheet.objectContent.landMark.county}&landMarkVillage=${parkSheet.objectContent.landMark.village}&landMarkName=${parkSheet.objectContent.landMark.name}&landMarkCode=${parkSheet.objectContent.landMark.code}&buildMarkCounty=${parkSheet.objectContent.buildMark.county}&buildMarkVillage=${parkSheet.objectContent.buildMark.village}&buildMarkName=${parkSheet.objectContent.buildMark.name}&buildMarkCode=${parkSheet.objectContent.buildMark.code}&buildAddressCounty=${parkSheet.objectContent.address.county}&buildAddressVillage=${parkSheet.objectContent.address.village}&buildAddress=${parkSheet.objectContent.address.address}&ParkArea=${parkSheet.objectContent.parkArea}&parkType=${parkSheet.objectContent.parkType}&parkMethod=${parkSheet.objectContent.parkMethod}&landRightsOwner=${parkSheet.propertyAnalysis.landRightsOwner}&landRightsStatus=${parkSheet.propertyAnalysis.landRightsStatus}&landRightsHolding=${parkSheet.propertyAnalysis.landRightsHolding}&buildingRightsOwner=${parkSheet.propertyAnalysis.buildingRightsOwner}&buildingRightsStatus=${parkSheet.propertyAnalysis.buildingRightsStatus}&buildingRightsHolding=${parkSheet.propertyAnalysis.buildingRightsHolding}&otherRights=${parkSheet.propertyAnalysis.otherRights}&assignMethod=${parkSheet.propertyAnalysis.assignMethod}&landUses=${parkSheet.currentUsage.landUse}&BuildingCoverageRatio=${parkSheet.currentUsage.BuildingCoverageRatio}&floorAreaRatio=${parkSheet.currentUsage.floorAreaRatio}&buildingUsage=${parkSheet.currentUsage.buildingUsage}&buildingStructure=${parkSheet.currentUsage.buildingStructure}&buildingFinishDate=${parkSheet.currentUsage.buildingFinishDate}&buildingUpFloor=${parkSheet.currentUsage.buildingUpFloor}&buildingDownFloor=${parkSheet.currentUsage.buildingDownFloor}&surveyFloor=${parkSheet.currentUsage.surveyFloor}&parkWidth=${parkSheet.currentUsage.parkWidth}&parkHeight=${parkSheet.currentUsage.parkHeight}&allowSuv=${parkSheet.currentUsage.allowSuv}&inspectionDate=${parkSheet.surveyDates.inspectionDate}&valueOpinionDate=${parkSheet.surveyDates.valueOpinionDate}&appraisalObject=${parkSheet.appraisalObject.appraisalObject}&appraisalDescription=${parkSheet.appraisalObject.appraisalDescription}&priceType=${parkSheet.estimateCondition.priceType}&evaluationRightsType=${parkSheet.estimateCondition.evaluationRightsType}&appraisalCondition=${parkSheet.estimateCondition.appraisalCondition}&surveyorName=${parkSheet.surveyDescription.surveyorName}&surveyDescription=${parkSheet.surveyDescription.surveyDescription}&transcriptFileBase64=${encodeURIComponent(parkSheet.transcriptFile)}&photoFilesBase64=${JSON.stringify(photoFilesEncoded)}&transcriptFileName=${parkSheet.transcriptFileName}&photoFilesName=${parkSheet.photoFilesName}`;
    try {
        const response = await fetch(url, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }
}

export const editParkSheet = async (parkSheet, _sheetId) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/editParkSheet`
    const headersList = {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    const photoFilesEncoded = []
    for (let i = 0; i < parkSheet.photoFiles.length; i++) {
        photoFilesEncoded.push(encodeURIComponent(parkSheet.photoFiles[i]))
    }
    const bodyContent = `token=${localStorage.getItem("token")}&_sheetId=${_sheetId}&assetType=${'停車位'}&landMarkCounty=${parkSheet.objectContent.landMark.county}&landMarkVillage=${parkSheet.objectContent.landMark.village}&landMarkName=${parkSheet.objectContent.landMark.name}&landMarkCode=${parkSheet.objectContent.landMark.code}&buildMarkCounty=${parkSheet.objectContent.buildMark.county}&buildMarkVillage=${parkSheet.objectContent.buildMark.village}&buildMarkName=${parkSheet.objectContent.buildMark.name}&buildMarkCode=${parkSheet.objectContent.buildMark.code}&buildAddressCounty=${parkSheet.objectContent.address.county}&buildAddressVillage=${parkSheet.objectContent.address.village}&buildAddress=${parkSheet.objectContent.address.address}&ParkArea=${parkSheet.objectContent.parkArea}&parkType=${parkSheet.objectContent.parkType}&parkMethod=${parkSheet.objectContent.parkMethod}&landRightsOwner=${parkSheet.propertyAnalysis.landRightsOwner}&landRightsStatus=${parkSheet.propertyAnalysis.landRightsStatus}&landRightsHolding=${parkSheet.propertyAnalysis.landRightsHolding}&buildingRightsOwner=${parkSheet.propertyAnalysis.buildingRightsOwner}&buildingRightsStatus=${parkSheet.propertyAnalysis.buildingRightsStatus}&buildingRightsHolding=${parkSheet.propertyAnalysis.buildingRightsHolding}&otherRights=${parkSheet.propertyAnalysis.otherRights}&assignMethod=${parkSheet.propertyAnalysis.assignMethod}&landUses=${parkSheet.currentUsage.landUse}&BuildingCoverageRatio=${parkSheet.currentUsage.BuildingCoverageRatio}&floorAreaRatio=${parkSheet.currentUsage.floorAreaRatio}&buildingUsage=${parkSheet.currentUsage.buildingUsage}&buildingStructure=${parkSheet.currentUsage.buildingStructure}&buildingFinishDate=${parkSheet.currentUsage.buildingFinishDate}&buildingUpFloor=${parkSheet.currentUsage.buildingUpFloor}&buildingDownFloor=${parkSheet.currentUsage.buildingDownFloor}&surveyFloor=${parkSheet.currentUsage.surveyFloor}&parkWidth=${parkSheet.currentUsage.parkWidth}&parkHeight=${parkSheet.currentUsage.parkHeight}&allowSuv=${parkSheet.currentUsage.allowSuv}&inspectionDate=${parkSheet.surveyDates.inspectionDate}&valueOpinionDate=${parkSheet.surveyDates.valueOpinionDate}&appraisalObject=${parkSheet.appraisalObject.appraisalObject}&appraisalDescription=${parkSheet.appraisalObject.appraisalDescription}&priceType=${parkSheet.estimateCondition.priceType}&evaluationRightsType=${parkSheet.estimateCondition.evaluationRightsType}&appraisalCondition=${parkSheet.estimateCondition.appraisalCondition}&surveyorName=${parkSheet.surveyDescription.surveyorName}&surveyDescription=${parkSheet.surveyDescription.surveyDescription}&transcriptFileBase64=${encodeURIComponent(parkSheet.transcriptFile)}&photoFilesBase64=${JSON.stringify(photoFilesEncoded)}&transcriptFileName=${parkSheet.transcriptFileName}&photoFilesName=${parkSheet.photoFilesName}`;
    try {
        const response = await fetch(url, {
            method: "PUT",
            body: bodyContent,
            headers: headersList
        })
        return response
    } catch (err) {
        return undefined
    }
}

export const deleteParkSheetById = async (_sheetId) => {
    const url = process.env.BASE_API_URL_V2 + `api/Survey/deleteParkSheet`
    const headersList = {
        "Accept": "*/*",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    const bodyContent = `token=${localStorage.getItem("token")}&_sheetId=${_sheetId}`;
    const response = await fetch(url, {
        method: "DELETE",
        body: bodyContent,
        headers: headersList
    })
    return response
}
