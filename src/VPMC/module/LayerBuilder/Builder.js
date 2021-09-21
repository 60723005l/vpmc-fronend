import { Layer } from "leaflet";
import LayerInfo from "../Layer/LayerInfo";
import Type from "../Layer/Type";

class Builder {
    constructor() {
        /**
         * @type {Type} one of Type
         */
        this.type = null
    }
    /**
     * @param {LayerInfo} info
     * @return {Layer}
     */
    processor( info ){}
}
export default Builder