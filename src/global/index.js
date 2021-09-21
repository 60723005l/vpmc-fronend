import VPMC from "../VPMC"
import StrategySwitcher from "../VPMC/module/StrategySwitcher"
        
const Global = 
{
    VPMC: new VPMC(process.env.CONTAINERID),
}
export default Global