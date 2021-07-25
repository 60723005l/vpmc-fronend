import Leaflet from 'leaflet'

/**
 * 
 * @param {*} option 
 * @example
 * option = {
 * elemId: 'myelemid',
 * position: [lat, lon],
 * zoom: 7
 * }
 */
const createViewer =  ( option ) =>
{
    let {elemId, position, zoom} = option
    return Leaflet.map(elemId).setView(position,zoom);
}

export default createViewer