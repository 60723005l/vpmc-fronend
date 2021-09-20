import VPMC from "../VPMC"
import StrategySwitcher from "../VPMC/module/StrategySwitcher"
        
const Global = 
{
    VPMC: new VPMC(process.env.CONTAINERID),
    LayerType:
    {
        POINT: 'point',
        LINE: 'line',
        POLYGON: 'polygon',
        BASEMAP: 'image',
    },
}
export default Global