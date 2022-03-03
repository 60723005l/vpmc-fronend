import proj4 from 'proj4'
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
proj4.defs("EPSG:3826", "+proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
proj4.defs("EPSG:3857", "+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs");

export const EPSG = {
  4326: 'EPSG:4326',
  3826: 'EPSG:3826',
  3857: 'EPSG:3857'
}


const projector = (from, to, {x, y}) => {
  return proj4(from, to, [x, y])
}

export default projector
