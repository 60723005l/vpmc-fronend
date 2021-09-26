const row = html => `<tr>\n${html}</tr>\n`,
      heading = object => row(Object.keys(object).reduce((html, heading) => (html + `<th>${heading}</th>`), '')),
      datarow = object => row(Object.values(object).reduce((html, value) => (html + `<td>${value}</td>`), ''));


/**
 * @param {Array} dataList
 */
export const toTable =  dataList => {
  return `<table>
            ${heading(dataList[0])}
            ${dataList.reduce((html, object) => (html + datarow(object)), '')}
          </table>`
}

export const singlePackToTable = pack => {
  let result = []
  for(let key in pack){
    let value = pack[key]
    result.push(
      `<tr><td>${key}</td><td>${value}</td></tr>`
    )
  }
  return `<table>${result.join('')}</table>`
}
