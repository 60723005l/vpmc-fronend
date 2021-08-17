/**
 * There are many seperated components share the same Cesium viewer object.
 * ViewerPromise allow you to add callback functions via addCallback() and execute them after viewer loaded.
 * If Cesium viewer has been loaded, then callback function in addCallback() will be execute immediately
 * This class is a delegate and should be used in GIAP.ViewerPromise.
 */
 class ViewerPromise
 {
     constructor()
     {
         this.loaded = false
         this.viewer = undefined
         this._callbacks = []
     }
     apply( callback )
     {
         if (this.loaded) callback( this.viewer )
         else
         {
             this._callbacks.push(callback)
         }
     }
     setViewer( viewer )
     {
         this.viewer = viewer
         this.loaded = true
         this.all()
     }
     all()
     {
         this._callbacks.forEach( callback => callback( this.viewer ) )
     }
 }
 
 export default ViewerPromise