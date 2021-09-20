import { isEmpty } from 'lodash'
export default class ViewerPromise
{
    constructor(option = {})
    {
        this.viewer = undefined
        this.stack = []
    }
    setViewer( viewer )
    {
        this.viewer = viewer
        this.stack.forEach( task => task(viewer) )
        this.stack = []
    }
    execute( callback = () => {} )
    {
        if( isEmpty( this.viewer ) ) this.stack.push( callback )
        else
        {
            callback(this.viewer)
        }
    }
}