
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