import { Layer } from "leaflet";
import LayerInfo from "../Layer/LayerInfo";
import Type from "../Layer/Type";
/**
 * this is a abstract class, shouldn't use it through new syntax
 */
class Builder {
    constructor() {
        /**
         * @type {Type} one of Type
         */
        this.type = null
    }
    /**
     * implement how layer should be created
     * @param {LayerInfo} info
     * @return {Layer}
     */
    processor( info ){}
}
export default Builder