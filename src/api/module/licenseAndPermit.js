
/**
 * @typedef {Object.<string, number} dateValue
 * @returns {Promise<{"總樓地板面積": dateValue,"公共集會類": dateValue,"商業類": dateValue,"工商倉儲類": dateValue,"休閒文教類": dateValue}>}
 */
export const listAll = async () => {
  return (await import('../../assets/fakeAPI/license_area_data.json'))
}
