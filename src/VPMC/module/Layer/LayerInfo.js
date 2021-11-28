import { values } from 'lodash'
import { UUID } from '../../../utilities'
import Type from './Type'
class LayerInfo {
    constructor( options ) {
        this.id = options.id || UUID()
        this.name = options.name
        this.group = options.group || '圖層'
        /**
         * @type {Type} on of Type
         */
        this.type = options.type
        this._show = false
        this._zIndex = 0
        this.options = options.options || {}
        this.init()
    }
    get show() {return this._show}
    get zIndex() {return this._zIndex}
    setShow( val ) {
        this._show = val
    }
    setZIndex( val ) {
        this._zIndex = val
    }
    init() {
        if( !Type.hasType( this.type ) ) {
            throw new Error(`type ${this.type} not valid`)
        }
    }

}
export default LayerInfo