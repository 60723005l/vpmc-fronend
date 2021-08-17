import Leaflet from 'leaflet'
import TableBuilder from "@/lib/Parser/TableBuilder"


export function isPropertyNormal( key, props )
{
    let key_prefix = key.slice(0,2)
    if( key_prefix === '--') return false
    else return true
}
export function getKeyType( key )
{
    let style_key = key.slice(2)
    if ( style_key === 'label' ) return 'label-option'
    else return 'style-option'
}
export function fixValue( key, props )
{
    let style_value = props[key],
        valueType = '',
        result = undefined
        
    if( style_value === 'false' || style_value === 'true') valueType = 'boolean'
    else if( isNaN(Number(style_value)) ) valueType = 'string'
    else valueType = 'number'
    switch( valueType )
    {
        case 'boolean':
            style_value === 'true' ? result = true : result = false
            break
        case 'number':
            result = Number(style_value)
            break
        case 'string':
            result = style_value
            break
    }
    return result 
}
export function defined_showProperty( object, container, material, 
    callback = {
        onShow: () => {},
        onHidden: () => {}
    } )
    {
        Object.defineProperty( object, '_show', {
            value: false,
            writable:true,
        })
        Object.defineProperty( object, 'show', {
            get: function ()
            {
                return object._show
            },
            set: function( bool )
            {
                //false
                // console.log(0,container.hasLayer( object ))
                if( !bool && container.hasLayer( object ) ) 
                {
                    // console.log(11111,false, container, object)
                    
                    container.removeLayer(object)
                    callback.onHidden()
                    // object.remove()
                    object._show = false
                    material.info.show = false
                }
                //true
                else if( bool && !container.hasLayer( object ) ) 
                {
                    // console.log(222222,true, container, object)
                    
                    container.addLayer(object)
                    callback.onShow()
                    object._show = true
                    material.info.show = true
                }
    
            }
        })
    }
export const bindTablePopup = ( material, props, layer ) =>
{
    let header = []
    let body = []
    for ( let key in props )
    {
        if( isPropertyNormal( key, props ) )
        {
            header.push(key)
            body.push(props[key])
        }
    }
    if ( material.info.popup )
    {
        let popup = Leaflet.popup().setContent( TableBuilder.createHTML(header,body) )
        layer.bindPopup( popup )
    }
}
export const getCentroid2 =  (arr) => {
    var twoTimesSignedArea = 0;
    var cxTimes6SignedArea = 0;
    var cyTimes6SignedArea = 0;

    var length = arr.length

    var x = function (i) { return arr[i % length][0] };
    var y = function (i) { return arr[i % length][1] };

    for ( var i = 0; i < arr.length; i++) {
        var twoSA = x(i)*y(i+1) - x(i+1)*y(i);
        twoTimesSignedArea += twoSA;
        cxTimes6SignedArea += (x(i) + x(i+1)) * twoSA;
        cyTimes6SignedArea += (y(i) + y(i+1)) * twoSA;
    }
    var sixSignedArea = 3 * twoTimesSignedArea;
    return [ cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea];        
}