import Global from '../global'
export const MapMixin = 
{
    methods: 
        {
            getLayerCenter()
            {
                return Global.VPMC.layerControl
            },
            getViewer()
            {
                return Global.VPMC.viewer
            },
        },
}